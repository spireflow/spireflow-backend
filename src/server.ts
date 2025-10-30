import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import compress from "@fastify/compress";
import { auth } from "./auth.js";
import schema from "./graphql/schema.js";
import { validateEnv } from "./config.js";

// Validate environment variables before starting
validateEnv();

const fastify = Fastify({
  logger: {
    level: "info",
  },
});

// Security: Helmet headers (XSS, clickjacking protection)
await fastify.register(helmet, {
  contentSecurityPolicy: false, // Disable for GraphiQL to work
  global: true,
});

// Performance: Compression (gzip/brotli)
await fastify.register(compress, {
  global: true,
  encodings: ["gzip", "deflate"],
});

// Security: Rate limiting (prevent DOS attacks)
await fastify.register(rateLimit, {
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // 100 req/min in prod
  timeWindow: "1 minute",
  errorResponseBuilder: (req, context) => ({
    statusCode: 429,
    error: "Too Many Requests",
    message: `Rate limit exceeded. Try again in ${context.after}`,
  }),
});

// CORS configuration
await fastify.register(cors, {
  origin:
    process.env.NODE_ENV === "production"
      ? (process.env.ALLOWED_ORIGINS || "").split(",")
      : [
          "http://localhost:3000",
          "http://localhost:4000",
          "http://localhost:5004",
        ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  maxAge: 86400, // Cache preflight requests for 24 hours
});

// Better Auth endpoint - Fastify implementation
// Note: Better Auth expects Fetch API Request, so we convert Fastify request
fastify.all("/api/auth/*", async (request, reply) => {
  try {
    // Construct full URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Convert Fastify headers to standard Headers object
    const headers = new Headers();
    Object.entries(request.headers).forEach(([key, value]) => {
      if (value) headers.append(key, value.toString());
    });

    // Create Fetch API-compatible request
    const req = new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
    });

    // Process authentication request
    const response = await auth.handler(req);

    // Forward response to client
    reply.status(response.status);
    response.headers.forEach((value, key) => reply.header(key, value));
    return reply.send(response.body ? await response.text() : null);
  } catch (error) {
    fastify.log.error({ err: error }, "Better Auth Error");
    return reply.status(500).send({
      error: "Internal authentication error",
      code: "AUTH_FAILURE",
    });
  }
});

// GraphQL with Mercurius
await fastify.register(mercurius, {
  schema,
  graphiql: process.env.NODE_ENV !== "production", // ✅ Disable in production
  path: "/graphql",

  // Security: Query complexity limits
  queryDepth: 12, // Prevent deeply nested queries

  // Context function
  context: (request, reply) => ({
    request,
    reply,
  }),

  // Error handling
  errorFormatter: (execution) => {
    fastify.log.error({ err: execution.errors }, "[GraphQL Error]");
    return {
      statusCode: 200,
      response: {
        data: execution.data || null,
        errors: execution.errors || [{ message: "Internal server error" }],
      },
    };
  },
});

// Health check endpoint
fastify.get("/health", async () => ({
  status: "ok",
  timestamp: new Date().toISOString(),
}));

// Graceful shutdown
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, async () => {
    fastify.log.info(`Received ${signal}, closing server...`);
    await fastify.close();
    process.exit(0);
  });
});

// Start server
const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "0.0.0.0";

try {
  await fastify.listen({ port: PORT, host: HOST });
  console.log("🚀 Spireflow Backend (Fastify) started");
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`🔐 Better Auth endpoint: http://localhost:${PORT}/api/auth/*`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

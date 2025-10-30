import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db.js";

export const auth = betterAuth({
  // Wymagane zmienne środowiskowe
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000/api/auth",

  // Konfiguracja bazy danych z Prisma adapter
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Włączenie logowania Email/Password
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true, // Automatyczne logowanie po rejestracji
  },

  // Konfiguracja sesji
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dni
    updateAge: 60 * 60 * 24, // Update co 24h
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minut cache
    },
  },

  // Trusted origins (CORS)
  trustedOrigins: ["http://localhost:3000", "http://localhost:4000"],

  // Email verification (placeholder - można rozwinąć później)
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log(`[Better Auth] Verification email for ${user.email}`);
      console.log(`[Better Auth] Verification URL: ${url}`);
      console.log(`[Better Auth] Token: ${token}`);
      // TODO: Implementacja wysyłki emaili (np. przez SendGrid, AWS SES, itp.)
    },
    sendOnSignUp: false, // Wyłączone dla demo
  },
});

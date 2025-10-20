-- CreateTable
CREATE TABLE "weekly_performance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "weekly_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_activities" (
    "id" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "weekly_activities_pkey" PRIMARY KEY ("id")
);

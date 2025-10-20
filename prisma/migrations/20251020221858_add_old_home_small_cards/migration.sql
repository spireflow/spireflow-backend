/*
  Warnings:

  - You are about to drop the `traders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "traders";

-- CreateTable
CREATE TABLE "old_home_small_cards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "metricPrev" TEXT NOT NULL,
    "delta" TEXT NOT NULL,
    "deltaType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "increased" BOOLEAN NOT NULL,
    "changeValue" DOUBLE PRECISION NOT NULL,
    "changeText" TEXT NOT NULL,
    "chartData" JSONB NOT NULL,

    CONSTRAINT "old_home_small_cards_pkey" PRIMARY KEY ("id")
);

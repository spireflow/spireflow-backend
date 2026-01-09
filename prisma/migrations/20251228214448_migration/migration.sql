/*
  Warnings:

  - You are about to drop the `home_small_cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `home_small_cards_2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `home_small_cards_3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "home_small_cards";

-- DropTable
DROP TABLE "home_small_cards_2";

-- DropTable
DROP TABLE "home_small_cards_3";

-- DropTable
DROP TABLE "regions";

-- CreateTable
CREATE TABLE "three_small_cards" (
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

    CONSTRAINT "three_small_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "four_small_cards" (
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

    CONSTRAINT "four_small_cards_pkey" PRIMARY KEY ("id")
);

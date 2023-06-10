-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "DatingGoal" AS ENUM ('FRIENDSHIP', 'RELATIONSHIP', 'BOTH');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "imageUrls" TEXT[],
    "biography" TEXT NOT NULL,
    "datingGoal" "DatingGoal" NOT NULL,
    "lastLocation" geometry(Point, 4326) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lastLocation_idx" ON "User" USING GIST ("lastLocation");

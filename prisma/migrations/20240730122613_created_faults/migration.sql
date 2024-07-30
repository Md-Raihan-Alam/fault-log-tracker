-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'ACTIVE', 'CLOSED');

-- CreateTable
CREATE TABLE "Faults" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faults_pkey" PRIMARY KEY ("id")
);

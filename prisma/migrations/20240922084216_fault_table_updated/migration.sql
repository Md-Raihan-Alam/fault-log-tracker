/*
  Warnings:

  - Added the required column `createdByUser` to the `Faults` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Faults" DROP CONSTRAINT "Faults_createdByUserId_fkey";

-- AlterTable
ALTER TABLE "Faults" ADD COLUMN     "createdByUser" TEXT NOT NULL;

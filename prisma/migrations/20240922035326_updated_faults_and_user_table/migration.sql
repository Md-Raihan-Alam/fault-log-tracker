/*
  Warnings:

  - Added the required column `createdByUserId` to the `Faults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faults" ADD COLUMN     "createdByUserId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Faults" ADD CONSTRAINT "Faults_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

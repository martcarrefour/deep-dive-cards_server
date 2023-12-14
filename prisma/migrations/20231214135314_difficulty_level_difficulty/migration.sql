/*
  Warnings:

  - You are about to drop the column `difficultyLevel` on the `cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "difficultyLevel",
ADD COLUMN     "difficulty" INTEGER NOT NULL DEFAULT 1;

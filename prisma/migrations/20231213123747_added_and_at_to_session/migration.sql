/*
  Warnings:

  - Added the required column `end_at` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL;

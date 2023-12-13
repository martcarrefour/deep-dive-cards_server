/*
  Warnings:

  - You are about to drop the column `packScoreId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `cards_scores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `packs_scores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards_scores" DROP CONSTRAINT "cards_scores_card_id_fkey";

-- DropForeignKey
ALTER TABLE "cards_scores" DROP CONSTRAINT "cards_scores_score_id_fkey";

-- DropForeignKey
ALTER TABLE "packs_scores" DROP CONSTRAINT "packs_scores_packId_fkey";

-- DropForeignKey
ALTER TABLE "packs_scores" DROP CONSTRAINT "packs_scores_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_packScoreId_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "packScoreId";

-- DropTable
DROP TABLE "cards_scores";

-- DropTable
DROP TABLE "packs_scores";

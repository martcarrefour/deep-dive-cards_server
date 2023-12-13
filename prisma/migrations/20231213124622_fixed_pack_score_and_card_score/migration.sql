/*
  Warnings:

  - You are about to drop the `cards_score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `packScoreId` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cards_score" DROP CONSTRAINT "cards_score_card_id_fkey";

-- DropForeignKey
ALTER TABLE "cards_score" DROP CONSTRAINT "cards_score_score_id_fkey";

-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_user_id_fkey";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "packScoreId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "cards_score";

-- DropTable
DROP TABLE "scores";

-- CreateTable
CREATE TABLE "packs_scores" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" INTEGER NOT NULL,
    "current_score" INTEGER NOT NULL DEFAULT 0,
    "max_score" INTEGER NOT NULL DEFAULT 10,
    "packId" INTEGER NOT NULL,

    CONSTRAINT "packs_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards_scores" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "score_id" INTEGER NOT NULL,
    "current_score" INTEGER NOT NULL DEFAULT 0,
    "max_score" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "cards_scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_packScoreId_fkey" FOREIGN KEY ("packScoreId") REFERENCES "packs_scores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packs_scores" ADD CONSTRAINT "packs_scores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packs_scores" ADD CONSTRAINT "packs_scores_packId_fkey" FOREIGN KEY ("packId") REFERENCES "packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards_scores" ADD CONSTRAINT "cards_scores_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards_scores" ADD CONSTRAINT "cards_scores_score_id_fkey" FOREIGN KEY ("score_id") REFERENCES "packs_scores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

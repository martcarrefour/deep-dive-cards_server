/*
  Warnings:

  - You are about to drop the column `scoreId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `pack_id` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `score` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_scoreId_fkey";

-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_pack_id_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "scoreId";

-- AlterTable
ALTER TABLE "score" DROP COLUMN "pack_id",
DROP COLUMN "result",
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cards_score" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "score_id" INTEGER,
    "current_score" INTEGER NOT NULL DEFAULT 0,
    "max_score" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "cards_score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards_score" ADD CONSTRAINT "cards_score_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards_score" ADD CONSTRAINT "cards_score_score_id_fkey" FOREIGN KEY ("score_id") REFERENCES "score"("id") ON DELETE SET NULL ON UPDATE CASCADE;

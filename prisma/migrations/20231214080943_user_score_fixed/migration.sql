/*
  Warnings:

  - You are about to drop the column `userScoreId` on the `cards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userScoreId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "userScoreId";

-- CreateTable
CREATE TABLE "_CardToUserScore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToUserScore_AB_unique" ON "_CardToUserScore"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToUserScore_B_index" ON "_CardToUserScore"("B");

-- AddForeignKey
ALTER TABLE "_CardToUserScore" ADD CONSTRAINT "_CardToUserScore_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToUserScore" ADD CONSTRAINT "_CardToUserScore_B_fkey" FOREIGN KEY ("B") REFERENCES "user_scores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

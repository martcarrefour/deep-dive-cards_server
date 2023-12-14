-- DropForeignKey
ALTER TABLE "user_scores" DROP CONSTRAINT "user_scores_card_id_fkey";

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "userScoreId" INTEGER;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userScoreId_fkey" FOREIGN KEY ("userScoreId") REFERENCES "user_scores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

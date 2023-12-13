/*
  Warnings:

  - You are about to drop the `score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards_score" DROP CONSTRAINT "cards_score_score_id_fkey";

-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_user_id_fkey";

-- DropTable
DROP TABLE "score";

-- CreateTable
CREATE TABLE "scores" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards_score" ADD CONSTRAINT "cards_score_score_id_fkey" FOREIGN KEY ("score_id") REFERENCES "scores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

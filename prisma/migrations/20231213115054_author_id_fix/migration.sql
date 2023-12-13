/*
  Warnings:

  - You are about to drop the column `user_id` on the `packs` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `packs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packs" DROP CONSTRAINT "packs_user_id_fkey";

-- AlterTable
ALTER TABLE "packs" DROP COLUMN "user_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "packs" ADD CONSTRAINT "packs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

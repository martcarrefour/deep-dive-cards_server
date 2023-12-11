/*
  Warnings:

  - You are about to drop the column `packId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `packs` table. All the data in the column will be lost.
  - You are about to drop the column `packId` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `pack_id` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `packs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pack_id` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_packId_fkey";

-- DropForeignKey
ALTER TABLE "packs" DROP CONSTRAINT "packs_userId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_packId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "packId",
ADD COLUMN     "pack_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "packs" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "packId",
ADD COLUMN     "pack_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packs" ADD CONSTRAINT "packs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

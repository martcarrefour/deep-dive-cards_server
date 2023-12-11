/*
  Warnings:

  - You are about to drop the column `pack_id` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_pack_id_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "pack_id";

-- CreateTable
CREATE TABLE "_PackToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PackToTag_AB_unique" ON "_PackToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PackToTag_B_index" ON "_PackToTag"("B");

-- AddForeignKey
ALTER TABLE "_PackToTag" ADD CONSTRAINT "_PackToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "packs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackToTag" ADD CONSTRAINT "_PackToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

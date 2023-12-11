/*
  Warnings:

  - The `roles` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `provider` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[title]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'YANDEX');

-- AlterTable
ALTER TABLE "packs" ALTER COLUMN "is_public" SET DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles",
ADD COLUMN     "roles" "UserRole"[],
DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProvider";

-- DropEnum
DROP TYPE "Provider";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "tags"("title");

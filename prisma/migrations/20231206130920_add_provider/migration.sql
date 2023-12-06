-- CreateEnum
CREATE TYPE "Privider" AS ENUM ('GOOGLE', 'YANDEX');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "Privider";

/*
  Warnings:

  - Added the required column `senderTelegramId` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "answered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "senderTelegramId" BIGINT NOT NULL;

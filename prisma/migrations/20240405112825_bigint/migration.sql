/*
  Warnings:

  - Changed the type of `telegramId` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "telegramId",
ADD COLUMN     "telegramId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `photo` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_account_key` ON `Admin`(`account`);

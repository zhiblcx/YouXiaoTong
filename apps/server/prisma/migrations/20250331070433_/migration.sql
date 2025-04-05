/*
  Warnings:

  - You are about to drop the column `stockName` on the `stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_applicationId_fkey`;

-- DropIndex
DROP INDEX `Stock_applicationId_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `stockName`,
    MODIFY `applicationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

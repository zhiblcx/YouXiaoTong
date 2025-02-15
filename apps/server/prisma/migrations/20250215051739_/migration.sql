/*
  Warnings:

  - Made the column `studentId` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_studentId_fkey`;

-- DropIndex
DROP INDEX `Transaction_studentId_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `type` ENUM('水费', '电费', '食堂', '充值') NOT NULL,
    MODIFY `method` VARCHAR(191) NULL,
    MODIFY `studentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

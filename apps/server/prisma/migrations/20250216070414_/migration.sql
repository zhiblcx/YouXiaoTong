/*
  Warnings:

  - You are about to drop the `utilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `utilities` DROP FOREIGN KEY `Utilities_businessId_fkey`;

-- DropTable
DROP TABLE `utilities`;

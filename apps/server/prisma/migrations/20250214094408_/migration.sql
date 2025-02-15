/*
  Warnings:

  - You are about to alter the column `money` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `note` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `note` TEXT NOT NULL,
    ADD COLUMN `status` ENUM('派送中', '已送达', '已取消') NOT NULL DEFAULT '派送中';

-- AlterTable
ALTER TABLE `student` MODIFY `money` DOUBLE NOT NULL DEFAULT 0.00;

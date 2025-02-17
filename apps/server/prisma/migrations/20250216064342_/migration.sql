/*
  Warnings:

  - Added the required column `money` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `money` DOUBLE NOT NULL;

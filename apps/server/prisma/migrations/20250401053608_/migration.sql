/*
  Warnings:

  - Added the required column `num` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stock` ADD COLUMN `num` INTEGER NOT NULL;

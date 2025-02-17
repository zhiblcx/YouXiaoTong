/*
  Warnings:

  - You are about to drop the column `logwork` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `wrap` on the `business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `business` DROP COLUMN `logwork`,
    DROP COLUMN `wrap`;

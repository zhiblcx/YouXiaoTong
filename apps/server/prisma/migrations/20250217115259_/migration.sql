/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    MODIFY `id` SMALLINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

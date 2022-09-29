/*
  Warnings:

  - You are about to drop the column `city` on the `cooperatives` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `cooperatives` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cooperatives" DROP COLUMN "city",
DROP COLUMN "uf";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "city",
DROP COLUMN "uf";

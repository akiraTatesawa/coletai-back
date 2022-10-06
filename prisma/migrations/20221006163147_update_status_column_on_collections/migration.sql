/*
  Warnings:

  - You are about to drop the column `is_cancelled` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the column `is_finished` on the `collections` table. All the data in the column will be lost.
  - Added the required column `status` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('ongoing', 'finished', 'cancelled');

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "is_cancelled",
DROP COLUMN "is_finished",
ADD COLUMN     "status" "CollectionStatus" NOT NULL;

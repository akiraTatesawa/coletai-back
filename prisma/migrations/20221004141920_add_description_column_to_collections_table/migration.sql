/*
  Warnings:

  - You are about to drop the `_CollectionsToRecyclingTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CollectionsToRecyclingTypes" DROP CONSTRAINT "_CollectionsToRecyclingTypes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionsToRecyclingTypes" DROP CONSTRAINT "_CollectionsToRecyclingTypes_B_fkey";

-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CollectionsToRecyclingTypes";

-- CreateTable
CREATE TABLE "_CollectionToRecyclingTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToRecyclingTypes_AB_unique" ON "_CollectionToRecyclingTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToRecyclingTypes_B_index" ON "_CollectionToRecyclingTypes"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToRecyclingTypes" ADD CONSTRAINT "_CollectionToRecyclingTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToRecyclingTypes" ADD CONSTRAINT "_CollectionToRecyclingTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "recycling_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

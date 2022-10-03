/*
  Warnings:

  - You are about to drop the `_CollectionsToRecylingTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionsToRecylingTypes" DROP CONSTRAINT "_CollectionsToRecylingTypes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionsToRecylingTypes" DROP CONSTRAINT "_CollectionsToRecylingTypes_B_fkey";

-- DropTable
DROP TABLE "_CollectionsToRecylingTypes";

-- CreateTable
CREATE TABLE "_CollectionsToRecyclingTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionsToRecyclingTypes_AB_unique" ON "_CollectionsToRecyclingTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionsToRecyclingTypes_B_index" ON "_CollectionsToRecyclingTypes"("B");

-- AddForeignKey
ALTER TABLE "_CollectionsToRecyclingTypes" ADD CONSTRAINT "_CollectionsToRecyclingTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionsToRecyclingTypes" ADD CONSTRAINT "_CollectionsToRecyclingTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "recycling_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

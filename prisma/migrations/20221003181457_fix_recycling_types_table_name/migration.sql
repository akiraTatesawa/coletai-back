/*
  Warnings:

  - You are about to drop the `_CollectionsToReyclingTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionsToReyclingTypes" DROP CONSTRAINT "_CollectionsToReyclingTypes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionsToReyclingTypes" DROP CONSTRAINT "_CollectionsToReyclingTypes_B_fkey";

-- DropTable
DROP TABLE "_CollectionsToReyclingTypes";

-- CreateTable
CREATE TABLE "_CollectionsToRecylingTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionsToRecylingTypes_AB_unique" ON "_CollectionsToRecylingTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionsToRecylingTypes_B_index" ON "_CollectionsToRecylingTypes"("B");

-- AddForeignKey
ALTER TABLE "_CollectionsToRecylingTypes" ADD CONSTRAINT "_CollectionsToRecylingTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionsToRecylingTypes" ADD CONSTRAINT "_CollectionsToRecylingTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "recycling_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

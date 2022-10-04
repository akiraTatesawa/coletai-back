/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `recycling_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recycling_types_name_key" ON "recycling_types"("name");

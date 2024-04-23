/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stream_key_key" ON "Stream"("key");

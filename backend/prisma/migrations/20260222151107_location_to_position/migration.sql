/*
  Warnings:

  - You are about to drop the column `location` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `position` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "location",
ADD COLUMN     "position" DOUBLE PRECISION NOT NULL;

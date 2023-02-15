/*
  Warnings:

  - You are about to drop the column `latitude` on the `travel_log` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `travel_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "travel_log" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "position" DOUBLE PRECISION[];

/*
  Warnings:

  - You are about to drop the column `position` on the `travel_log` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `travel_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `travel_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travel_log" DROP COLUMN "position",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

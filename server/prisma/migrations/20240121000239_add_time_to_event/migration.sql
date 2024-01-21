/*
  Warnings:

  - Added the required column `finalTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicialTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "finalTime" TEXT NOT NULL,
ADD COLUMN     "inicialTime" TEXT NOT NULL;

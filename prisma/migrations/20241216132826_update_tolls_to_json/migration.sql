/*
  Warnings:

  - The `tolls` column on the `vehicles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "tolls",
ADD COLUMN     "tolls" JSONB NOT NULL DEFAULT '{}';

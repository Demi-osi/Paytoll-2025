-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "tolls" TEXT[] DEFAULT ARRAY[]::TEXT[];

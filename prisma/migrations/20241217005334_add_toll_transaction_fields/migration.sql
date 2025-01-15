/*
  Warnings:

  - You are about to drop the column `date` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `license_plate` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toll_incurred_at` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toll_name` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "date",
ADD COLUMN     "date_paid" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "license_plate" VARCHAR(20) NOT NULL,
ADD COLUMN     "toll_incurred_at" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "toll_name" VARCHAR(255) NOT NULL;

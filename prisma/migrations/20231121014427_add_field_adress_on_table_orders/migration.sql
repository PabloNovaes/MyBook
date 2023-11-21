/*
  Warnings:

  - Added the required column `adressId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "adressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

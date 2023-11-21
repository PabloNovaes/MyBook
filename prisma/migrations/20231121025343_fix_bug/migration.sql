-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_adressId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "adressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "adresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

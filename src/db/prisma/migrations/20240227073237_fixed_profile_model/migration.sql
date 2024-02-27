/*
  Warnings:

  - You are about to drop the column `view` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE product_id_seq;
ALTER TABLE "Product" DROP COLUMN "view",
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" SET DEFAULT nextval('product_id_seq');
ALTER SEQUENCE product_id_seq OWNED BY "Product"."id";

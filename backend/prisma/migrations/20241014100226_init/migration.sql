/*
  Warnings:

  - The primary key for the `Loan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Loan` table. All the data in the column will be lost.
  - The required column `loanId` was added to the `Loan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_pkey",
DROP COLUMN "id",
ADD COLUMN     "loanId" TEXT NOT NULL,
ADD CONSTRAINT "Loan_pkey" PRIMARY KEY ("loanId");

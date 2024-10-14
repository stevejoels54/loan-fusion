import prisma from "../../config/database";

class LoanService {
  async createLoan(data: any) {
    return await prisma.loan.create({ data });
  }

  async getLoans() {
    return await prisma.loan.findMany();
  }

  async getLoanById(loanId: string) {
    return await prisma.loan.findUnique({
      where: {
        loanId,
      },
    });
  }

  async updateLoan(loanId: string, data: any) {
    return await prisma.loan.update({
      where: {
        loanId,
      },
      data,
    });
  }

  async deleteLoan(loanId: string) {
    return await prisma.loan.delete({
      where: {
        loanId,
      },
    });
  }
}

export default new LoanService();

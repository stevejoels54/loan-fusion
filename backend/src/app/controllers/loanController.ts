import { Request, Response } from "express";
import LoanService from "../services/loanService";

class LoanController {
  async createLoan(req: Request, res: Response): Promise<void> {
    const { customerId, loanAmount, repaymentPeriod, loanPurpose } = req.body;
    try {
      const loan = await LoanService.createLoan({
        customerId,
        loanAmount,
        repaymentPeriod,
        loanPurpose,
      });
      res.status(201).json({
        loanId: loan.loanId,
        status: loan.status,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await LoanService.getLoans();
      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getLoanById(req: Request, res: Response): Promise<void> {
    const { loanId } = req.params;
    try {
      const loan = await LoanService.getLoanById(loanId);
      if (!loan) {
        res.status(404).json({ error: "Loan not found" });
      }
      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateLoan(req: Request, res: Response): Promise<void> {
    const { loanId } = req.params;
    const { customerId, loanAmount, repaymentPeriod, loanPurpose } = req.body;
    try {
      const loan = await LoanService.updateLoan(loanId, {
        customerId,
        loanAmount,
        repaymentPeriod,
        loanPurpose,
      });
      res.status(200).json({
        loanId: loan.loanId,
        status: loan.status,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteLoan(req: Request, res: Response): Promise<void> {
    const { loanId } = req.params;
    try {
      await LoanService.deleteLoan(loanId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new LoanController();

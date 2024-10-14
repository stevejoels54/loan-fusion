export interface Loan {
  loanId: string;
  customerId: string;
  loanAmount: number;
  repaymentPeriod: number; // in months
  loanPurpose: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
  updatedAt?: string;
}

export interface LoanUpdate {
  loanId?: string;
  customerId?: string;
  loanAmount?: number;
  repaymentPeriod?: number;
  loanPurpose?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}

export type LoanList = Loan[];

export interface ErrorResponse {
  data: {
    error: string;
    message: string;
  };
}

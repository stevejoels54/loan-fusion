package com.loanservice.loan_application.service;

import com.loanservice.loan_application.model.LoanApplication;
import com.loanservice.loan_application.repository.LoanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public Iterable<LoanApplication> getLoans() {
        return loanRepository.findAll();
    }

    public LoanApplication applyForLoan(LoanApplication loanApplication) {
        return loanRepository.save(loanApplication);
    }

    public LoanApplication getLoanById(String loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public void deleteLoan(String loanId) {
        loanRepository.deleteById(loanId);
    }

    @Transactional
    public LoanApplication updateLoan(String loanId, LoanApplication updatedLoan) {
        LoanApplication loan = getLoanById(loanId);

        if (updatedLoan.getLoanAmount() != null) {
            loan.setLoanAmount(updatedLoan.getLoanAmount());
        }
        if (updatedLoan.getStatus() != null) {
            loan.setStatus(updatedLoan.getStatus());
        }
        if (updatedLoan.getRepaymentPeriod() != null) {
            loan.setRepaymentPeriod(updatedLoan.getRepaymentPeriod());
        }
        if (updatedLoan.getLoanPurpose() != null) {
            loan.setLoanPurpose(updatedLoan.getLoanPurpose());
        }

        return loanRepository.save(loan);
    }
}

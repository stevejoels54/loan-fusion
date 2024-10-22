package com.loanservice.loan_application.service;


import com.loanservice.loan_application.model.LoanApplication;
import com.loanservice.loan_application.model.LoanStatus;
import com.loanservice.loan_application.repository.LoanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(MockitoExtension.class)
public class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private LoanService loanService;

    private LoanApplication testLoanApplication;

    @BeforeEach
    void setUp() {
        testLoanApplication = new LoanApplication();
        testLoanApplication.setLoanId("test-loan-id");
        testLoanApplication.setCustomerId("test-customer");
        testLoanApplication.setLoanAmount(5000.0);
        testLoanApplication.setRepaymentPeriod(12);
        testLoanApplication.setLoanPurpose("Test Purpose");
        testLoanApplication.setStatus(LoanStatus.PENDING);
    }

    @Test
    void applyForLoan_ShouldCreateNewLoan() {
        when(loanRepository.save(any(LoanApplication.class))).thenReturn(testLoanApplication);

        LoanApplication result = loanService.applyForLoan(testLoanApplication);

        assertNotNull(result);
        assertEquals("test-loan-id", result.getLoanId());
        assertEquals(LoanStatus.PENDING, result.getStatus());
    }

    @Test
    void getLoanById_ShouldReturnLoan() {
        when(loanRepository.findById("test-loan-id")).thenReturn(Optional.of(testLoanApplication));

        LoanApplication result = loanService.getLoanById("test-loan-id");

        assertNotNull(result);
        assertEquals("test-loan-id", result.getLoanId());
    }

    @Test
    void getLoanById_ShouldThrowException_WhenLoanNotFound() {
        when(loanRepository.findById("non-existent-id")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            loanService.getLoanById("non-existent-id");
        });
    }

    @Test
    void updateLoan_ShouldUpdateLoanDetails() {
        LoanApplication updatedLoan = new LoanApplication();
        updatedLoan.setLoanAmount(6000.0);
        updatedLoan.setRepaymentPeriod(24);

        when(loanRepository.findById("test-loan-id")).thenReturn(Optional.of(testLoanApplication));
        when(loanRepository.save(any(LoanApplication.class))).thenReturn(testLoanApplication);

        LoanApplication result = loanService.updateLoan("test-loan-id", updatedLoan);

        assertNotNull(result);
        assertEquals("test-loan-id", result.getLoanId());
    }
}


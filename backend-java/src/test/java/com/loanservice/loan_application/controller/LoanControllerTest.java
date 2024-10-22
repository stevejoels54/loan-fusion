package com.loanservice.loan_application.controller;


import com.loanservice.loan_application.model.LoanApplication;
import com.loanservice.loan_application.model.LoanStatus;
import com.loanservice.loan_application.service.LoanService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LoanController.class)
public class LoanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LoanService loanService;

    @Autowired
    private ObjectMapper objectMapper;

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
    void applyForLoan_ShouldCreateLoan() throws Exception {
        when(loanService.applyForLoan(any(LoanApplication.class))).thenReturn(testLoanApplication);

        mockMvc.perform(post("/api/loans/apply")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testLoanApplication)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.loanId").value("test-loan-id"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void getLoanStatus_ShouldReturnLoan() throws Exception {
        when(loanService.getLoanById("test-loan-id")).thenReturn(testLoanApplication);

        mockMvc.perform(get("/api/loans/test-loan-id"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.loanId").value("test-loan-id"))
                .andExpect(jsonPath("$.customerId").value("test-customer"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void updateLoan_ShouldUpdateLoanDetails() throws Exception {
        when(loanService.updateLoan(any(), any())).thenReturn(testLoanApplication);

        mockMvc.perform(put("/api/loans/test-loan-id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testLoanApplication)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.loanId").value("test-loan-id"));
    }
}
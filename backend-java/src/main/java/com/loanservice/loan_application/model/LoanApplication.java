package com.loanservice.loan_application.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "loan_applications")
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "$loanId$", updatable = false, nullable = false)
    private String loanId;

    @NotBlank(message = "Customer ID is required")
    @Column(name = "$customerId$", nullable = false)
    private String customerId;

    @NotNull(message = "Loan amount is required")
    @Min(value = 1, message = "Loan amount must be greater than 0")
    @Column(name = "$loanAmount$", nullable = false)
    private Double loanAmount;

    @NotNull(message = "Repayment period is required")
    @Min(value = 1, message = "Repayment period must be at least 1 month")
    @Column(name = "$repaymentPeriod$", nullable = false)
    private Integer repaymentPeriod;

    @NotBlank(message = "Loan purpose is required")
    @Column(name = "$loanPurpose$", nullable = false)
    private String loanPurpose;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LoanStatus status = LoanStatus.PENDING;

    @Column(name = "$createdAt$", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "$updatedAt$")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

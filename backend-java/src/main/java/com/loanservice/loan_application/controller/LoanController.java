package com.loanservice.loan_application.controller;

import com.loanservice.loan_application.dto.LoanApplicationResponseDTO;
import com.loanservice.loan_application.model.LoanApplication;
import com.loanservice.loan_application.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/loans")
@CrossOrigin
public class LoanController {

        private final LoanService loanService;

        public LoanController(LoanService loanService) {
            this.loanService = loanService;
        }

        @GetMapping
        public ResponseEntity<Iterable<LoanApplication>> getLoans() {
            return ResponseEntity.ok(loanService.getLoans());
        }

        @PostMapping
        public ResponseEntity<LoanApplicationResponseDTO> applyForLoan(@Valid @RequestBody LoanApplication loanApplication) {
            LoanApplication savedLoan = loanService.applyForLoan(loanApplication);

            LoanApplicationResponseDTO response = new LoanApplicationResponseDTO(
                    savedLoan.getLoanId(),
                    savedLoan.getStatus().toString()
            );
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }

        @GetMapping("/{loanId}")
        public ResponseEntity<LoanApplication> getLoanById(@PathVariable String loanId) {
            System.out.println("loanId: " + loanId);
            return ResponseEntity.ok(loanService.getLoanById(loanId));
        }

        @DeleteMapping("/{loanId}")
        public ResponseEntity<Void> deleteLoan(@PathVariable String loanId) {
            loanService.deleteLoan(loanId);
            return ResponseEntity.noContent().build();
        }

        @PutMapping("/{loanId}")
        public ResponseEntity<LoanApplication> updateLoan(@PathVariable String loanId, @Valid @RequestBody LoanApplication updatedLoan) {
            return ResponseEntity.ok(loanService.updateLoan(loanId, updatedLoan));
        }
}

import { Request, Response } from "express";
import LoanController from "../../controllers/loanController";
import LoanService from "../../services/loanService";

// Mock the LoanService
jest.mock("../../services/loanService");

describe("LoanController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;
  let responseEnd: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnThis();
    responseEnd = jest.fn();
    mockResponse = {
      json: responseJson,
      status: responseStatus,
      end: responseEnd,
    };
    mockRequest = {};
  });

  describe("createLoan", () => {
    it("should create a loan and return 201 status", async () => {
      const loanData = {
        customerId: "123e4567-e89b-12d3-a456-426614174000",
        loanAmount: 1000,
        repaymentPeriod: 12,
        loanPurpose: "Home renovation",
      };
      mockRequest.body = loanData;
      const createdLoan = { loanId: "1", status: "PENDING", ...loanData };
      (LoanService.createLoan as jest.Mock).mockResolvedValue(createdLoan);

      await LoanController.createLoan(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(LoanService.createLoan).toHaveBeenCalledWith(loanData);
      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({
        loanId: createdLoan.loanId,
        status: createdLoan.status,
      });
    });

    it("should return 500 status on error", async () => {
      mockRequest.body = {};
      (LoanService.createLoan as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await LoanController.createLoan(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });

  describe("getLoans", () => {
    it("should return all loans with 200 status", async () => {
      const loans = [
        { loanId: "1", status: "PENDING" },
        { loanId: "2", status: "APPROVED" },
      ];
      (LoanService.getLoans as jest.Mock).mockResolvedValue(loans);

      await LoanController.getLoans(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(LoanService.getLoans).toHaveBeenCalled();
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(loans);
    });

    it("should return 500 status on error", async () => {
      (LoanService.getLoans as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await LoanController.getLoans(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });

  describe("getLoanById", () => {
    it("should return a loan with 200 status when found", async () => {
      const loan = { loanId: "1", status: "PENDING" };
      mockRequest.params = { loanId: "1" };
      (LoanService.getLoanById as jest.Mock).mockResolvedValue(loan);

      await LoanController.getLoanById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(LoanService.getLoanById).toHaveBeenCalledWith("1");
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(loan);
    });

    it("should return 404 status when loan is not found", async () => {
      mockRequest.params = { loanId: "1" };
      (LoanService.getLoanById as jest.Mock).mockResolvedValue(null);

      await LoanController.getLoanById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ error: "Loan not found" });
    });

    it("should return 500 status on error", async () => {
      mockRequest.params = { loanId: "1" };
      (LoanService.getLoanById as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await LoanController.getLoanById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });

  describe("updateLoan", () => {
    it("should update a loan and return 200 status", async () => {
      const loanId = "1";
      const updateData = {
        loanAmount: 2000,
        repaymentPeriod: 24,
      };
      mockRequest.params = { loanId };
      mockRequest.body = updateData;
      const updatedLoan = { loanId, status: "APPROVED", ...updateData };
      (LoanService.updateLoan as jest.Mock).mockResolvedValue(updatedLoan);

      await LoanController.updateLoan(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(LoanService.updateLoan).toHaveBeenCalledWith(loanId, updateData);
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith({
        loanId: updatedLoan.loanId,
        status: updatedLoan.status,
      });
    });

    it("should return 500 status on error", async () => {
      mockRequest.params = { loanId: "1" };
      mockRequest.body = {};
      (LoanService.updateLoan as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await LoanController.updateLoan(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });

  describe("deleteLoan", () => {
    it("should delete a loan and return 204 status", async () => {
      mockRequest.params = { loanId: "1" };
      (LoanService.deleteLoan as jest.Mock).mockResolvedValue(undefined);

      await LoanController.deleteLoan(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(LoanService.deleteLoan).toHaveBeenCalledWith("1");
      expect(responseStatus).toHaveBeenCalledWith(204);
      expect(responseEnd).toHaveBeenCalled();
    });

    it("should return 500 status on error", async () => {
      mockRequest.params = { loanId: "1" };
      (LoanService.deleteLoan as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await LoanController.deleteLoan(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });
});

import express from "express";
import loanController from "../controllers/loanController";
import loanValidation from "../validations/loanValidation";

const { createLoan, getLoans, getLoanById, updateLoan, deleteLoan } =
  loanController;
const { validateCreateLoan, validateUpdateLoan } = loanValidation;

const router = express.Router();

router.post("/", validateCreateLoan, createLoan);
router.get("/", getLoans);
router.get("/:loanId", getLoanById);
router.put("/:loanId", validateUpdateLoan, updateLoan);
router.delete("/:loanId", deleteLoan);

export default router;

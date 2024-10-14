import Joi from "joi";
import { Request, Response, NextFunction } from "express";

class LoanValidator {
  private createLoanSchema: Joi.ObjectSchema;
  private updateLoanSchema: Joi.ObjectSchema;

  constructor() {
    this.createLoanSchema = Joi.object({
      customerId: Joi.string().uuid().required().label("Customer ID"),
      loanAmount: Joi.number()
        .precision(2)
        .positive()
        .required()
        .label("Loan Amount"),
      repaymentPeriod: Joi.number()
        .integer()
        .positive()
        .required()
        .label("Repayment Period"),
      loanPurpose: Joi.string().max(255).required().label("Loan Purpose"),
      status: Joi.string()
        .valid("PENDING", "APPROVED", "REJECTED")
        .default("PENDING"),
    });

    this.updateLoanSchema = Joi.object({
      customerId: Joi.string().uuid().label("Customer ID"),
      loanAmount: Joi.number().precision(2).positive().label("Loan Amount"),
      repaymentPeriod: Joi.number()
        .integer()
        .positive()
        .label("Repayment Period"),
      loanPurpose: Joi.string().max(255).label("Loan Purpose"),
      status: Joi.string().valid("PENDING", "APPROVED", "REJECTED"),
    }).min(1);
  }

  public validateCreateLoan = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { error } = this.createLoanSchema.validate(req.body, {
      abortEarly: false,
    });
    this.handleValidationResult(error, res, next);
  };

  public validateUpdateLoan = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { error } = this.updateLoanSchema.validate(req.body, {
      abortEarly: false,
    });
    this.handleValidationResult(error, res, next);
  };

  private handleValidationResult(
    error: Joi.ValidationError | undefined,
    res: Response,
    next: NextFunction
  ): void {
    if (error) {
      res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    } else {
      next();
    }
  }
}

export default new LoanValidator();

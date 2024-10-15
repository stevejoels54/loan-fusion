/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { Loan, LoanUpdate, LoanList, ErrorResponse } from "../../../types";
import axios from "axios";
import { notification } from "antd";

const initialState = {
  loans: [] as LoanList,
  loansLoading: false,
  loansError: {},

  loan: {} as Loan,
  loanLoading: false,
  loanError: "",

  updateLoanSuccess: {},
  updateLoanError: {
    error: "",
    errors: [],
  },
  updatingLoan: false,
  upodateLoanData: {} as LoanUpdate,

  loanData: {} as Loan,

  deleteLoanSuccess: {},
  deleteLoanError: "",
  deletingLoan: false,

  createLoanSuccess: {},
  createLoanError: {
    error: "",
    errors: [],
  },
  creatingLoan: false,

  // modals
  addLoanModalOpen: false,
  editLoanModalOpen: false,
  deleteLoanModalOpen: false,
  loanDetailsModalOpen: false,
};

const store = (
  set: (fn: (state: typeof initialState) => void) => void,
  get: any
) => ({
  ...initialState,

  // actions
  getLoans: async () => {
    set(
      produce((state) => {
        state.loansLoading = true;
        state.loansError = {};
      })
    );
    try {
      const response = await axios.get("/");
      set(
        produce((state) => {
          state.loans = response;
          state.loansLoading = false;
        })
      );
    } catch (error) {
      set(
        produce((state) => {
          state.loansError = (error as ErrorResponse).data;
          state.loansLoading = false;
        })
      );
    }
  },

  getLoan: async (loanId: string) => {
    set(
      produce((state) => {
        state.loanLoading = true;
        state.loanError = {};
      })
    );
    try {
      const response = await axios.get(`/${loanId}`);
      set(
        produce((state) => {
          state.loan = response;
          state.loanLoading = false;
        })
      );

      // success notification
      notification.success({
        type: "success",
        message: "Success",
        description: "Loan fetched successfully",
      });
    } catch (error) {
      set(
        produce((state) => {
          state.loanError = (error as ErrorResponse).data;
          state.loanLoading = false;
        })
      );

      // error notification
      notification.error({
        type: "error",
        message: "Error",
        description: "Error fetching loan",
      });
    }
  },

  updateLoan: async (loanId: string, data: LoanUpdate) => {
    set(
      produce((state) => {
        state.updatingLoan = true;
        state.updateLoanError = {};
      })
    );
    try {
      const response = await axios.put(`/${loanId}`, data);
      set(
        produce((state) => {
          state.updateLoanSuccess = response;
          state.updatingLoan = false;
          //   update loan in loans list
          const loanIndex = state.loans.findIndex(
            (loan: Loan) => loan.loanId === loanId
          );
          state.loans[loanIndex] = { ...state.loans[loanIndex], ...data };
        })
      );

      // notification success
      notification.success({
        type: "success",
        message: "Success",
        description: "Loan updated successfully",
      });
    } catch (error) {
      set(
        produce((state) => {
          state.updateLoanError = (error as ErrorResponse).data;
          state.updatingLoan = false;
        })
      );

      // notification error
      notification.error({
        type: "error",
        message: "Error",
        description: "Error updating loan",
      });
    }
  },

  deleteLoan: async (loanId: string) => {
    set(
      produce((state) => {
        state.deletingLoan = true;
        state.deleteLoanError = {};
      })
    );
    try {
      const response = await axios.delete(`/${loanId}`);
      set(
        produce((state) => {
          state.deleteLoanSuccess = response;
          state.deletingLoan = false;
          state.loans = state.loans.filter(
            (loan: Loan) => loan.loanId !== loanId
          );
        })
      );

      // notification success
      notification.success({
        type: "success",
        message: "Success",
        description: "Loan deleted successfully",
      });
    } catch (error) {
      set(
        produce((state) => {
          state.deleteLoanError = (error as ErrorResponse).data;
          state.deletingLoan = false;
        })
      );

      // notification error
      notification.error({
        type: "error",
        message: "Error",
        description: "Error deleting loan",
      });
    }
  },

  createLoan: async (data: Loan) => {
    set(
      produce((state) => {
        state.creatingLoan = true;
        state.createLoanError = {};
      })
    );
    try {
      const response = await axios.post(`/`, data);
      set(
        produce((state) => {
          state.createLoanSuccess = response;
          state.creatingLoan = false;
        })
      );

      // close modal
      set(
        produce((state) => {
          state.addLoanModalOpen = false;
        })
      );

      // refresh loans
      await get().getLoans();

      // notification success
      notification.success({
        type: "success",
        message: "Success",
        description: "Loan created successfully",
      });
    } catch (error) {
      set(
        produce((state) => {
          state.createLoanError = (error as ErrorResponse).data;
          state.creatingLoan = false;
        })
      );

      // notification error
      notification.error({
        type: "error",
        message: "Error",
        description: "Error creating loan",
      });
    }
  },

  setLoanData: (data: Loan) => {
    set(
      produce((state) => {
        state.loanData = data;
      })
    );
  },

  // modals
  setAddLoanModalOpen: (open: boolean) => {
    set(
      produce((state) => {
        state.addLoanModalOpen = open;
      })
    );
  },
  setEditLoanModalOpen: (open: boolean) => {
    set(
      produce((state) => {
        state.editLoanModalOpen = open;
      })
    );
  },
  setDeleteLoanModalOpen: (open: boolean) => {
    set(
      produce((state) => {
        state.deleteLoanModalOpen = open;
      })
    );
  },
  setLoanDetailsModalOpen: (open: boolean) => {
    set(
      produce((state) => {
        state.loanDetailsModalOpen = open;
      })
    );
  },
});

const storeName = "LOANS STORE";
const useLoansStore = create(devtools(store, { name: storeName }));

export default useLoansStore;

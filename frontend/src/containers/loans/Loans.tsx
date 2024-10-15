/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useLoansStore } from "../../config/stores";
import LoansTable from "./tables/LoansTable";
import AddLoanForm from "./forms/AddLoanForm";
import UpdateLoanForm from "./forms/UpdateLoanForm";
import LoanDetails from "./details/LoanDetails";

const Loans = () => {
  const loansStore = useLoansStore();

  useEffect(() => {
    if (isEmpty(loansStore.loans)) {
      loansStore.getLoans();
    }
  }, []);

  return (
    <div>
      <h2>Loans</h2>
      <LoansTable />
      <AddLoanForm />
      <UpdateLoanForm />
      <LoanDetails />
    </div>
  );
};

export default Loans;

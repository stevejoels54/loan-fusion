import AntdModal from "../../../components/common/AntdModal";
import { useLoansStore } from "../../../config/stores";
import { Tag } from "antd";
import dayjs from "dayjs";
import { customers } from "../../../config/constants";

const LoanDetails = () => {
  const loansStore = useLoansStore();

  const formatNumber = (value: number) =>
    value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <AntdModal
      title="LOAN DETAILS"
      open={loansStore.loanDetailsModalOpen}
      closeModal={() => loansStore.setLoanDetailsModalOpen(false)}
    >
      <div className="mt-2 px-1 w-sm-100 h-500 overflow-auto">
        <table className="table table-borderless table-hover">
          <tbody>
            <tr>
              <td className="text-gray-500">Customer</td>
              <td>
                {customers.map((customer) => {
                  if (customer.customerId === loansStore.loan.customerId) {
                    return customer.name;
                  }
                })}
              </td>
            </tr>

            <tr>
              <td className="text-gray-500">Amount</td>
              <td>UGX {formatNumber(loansStore.loan.loanAmount)}</td>
            </tr>

            <tr>
              <td className="text-gray-500">Repayment Period</td>
              <td>{loansStore.loan.repaymentPeriod} months</td>
            </tr>

            <tr>
              <td className="text-gray-500">Status</td>
              <td>
                <Tag
                  color={
                    loansStore.loan.status === "PENDING"
                      ? "orange"
                      : loansStore.loan.status === "APPROVED"
                      ? "green"
                      : "red"
                  }
                >
                  {loansStore.loan.status}
                </Tag>
              </td>
            </tr>

            <tr>
              <td className="text-gray-500">Purpose</td>
              <td>{loansStore.loan.loanPurpose}</td>
            </tr>

            <tr>
              <td className="text-gray-500">Created At</td>
              <td>
                {dayjs(loansStore.loan.createdAt).format(
                  "DD MMMM YYYY HH:mm:ss"
                )}
              </td>
            </tr>

            <tr>
              <td className="text-gray-500">Updated At</td>
              <td>
                {dayjs(loansStore.loan.updatedAt).format(
                  "DD MMMM YYYY HH:mm:ss"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-4"></div>
    </AntdModal>
  );
};

export default LoanDetails;

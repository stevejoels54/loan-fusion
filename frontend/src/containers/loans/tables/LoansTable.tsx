/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tag, Table } from "antd";
import { useState } from "react";
import { searchTable } from "../../../config/constants";
import TableButtonActions from "../../../components/common/TableButtonActions";
import TableTitle from "../../../components/common/TableTitle";
import { useLoansStore } from "../../../config/stores";
import { Loan, LoanList } from "../../../types";
import { customers } from "../../../config/constants";

const LoansTable = () => {
  const [filterTable, setFilterTable] = useState<Record<string, any>[] | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<React.Key | undefined>(undefined);

  const loansStore = useLoansStore();

  const viewDetails = (record: Loan) => {
    loansStore.setLoanDetailsModalOpen(true);
    loansStore.getLoan(record.loanId);
  };

  const updateRecord = (record: Loan) => {
    loansStore.setEditLoanModalOpen(true);
    loansStore.setLoanData(record);
  };

  const deleteRecord = (id: React.Key, _record: { id: React.Key }) =>
    setDeleteId(id);
  const confirmDelete = (id: React.Key) => {
    loansStore.deleteLoan(id as string);
  };

  const formatNumber = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const columns = [
    {
      title: "CUSTOMER",
      key: "customerId",
      render: (record: Loan) => {
        return (
          <div>
            <span className="d-md-none">CUSTOMER: </span>
            {customers.map((customer) => {
              if (customer.customerId === record.customerId) {
                return customer.name;
              }
            })}
            <br />
            <div className="d-md-none">
              <span className="d-md-none">PURPOSE: </span>
              {record?.loanPurpose} <br />
              <span className="d-md-none">AMOUNT: </span>
              UGX {formatNumber(record?.loanAmount)} <br />
              <span className="d-md-none">REPAYMENT: </span>
              {record?.repaymentPeriod} months <br />
              <span className="d-md-none">STATUS: </span>
              <Tag
                color={
                  record.status === "PENDING"
                    ? "orange"
                    : record.status === "APPROVED"
                    ? "green"
                    : "red"
                }
              >
                {record.status}
              </Tag>
              <br />
              ACTIONS:
              <TableButtonActions
                record={{
                  ...record,
                  id: record.loanId,
                }}
                confirmDelete={confirmDelete}
                deleteLoading={loansStore.deletingLoan}
                viewDetails={() => viewDetails(record)}
                updateRecord={() => updateRecord(record)}
                deleteId={deleteId}
                deleteRecord={(id: any, record: any) =>
                  deleteRecord(id, record)
                }
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "PURPOSE",
      key: "loanPurpose",
      responsive: ["md" as const],
      render: (record: Loan) => {
        return record?.loanPurpose;
      },
    },
    {
      title: "AMOUNT",
      key: "loanAmount",
      responsive: ["md" as const],
      render: (record: Loan) => {
        return `UGX ${formatNumber(record?.loanAmount)}`;
      },
    },
    {
      title: "REPAYMENT",
      key: "repaymentPeriod",
      responsive: ["md" as const],
      render: (record: Loan) => {
        return `${record?.repaymentPeriod} months`;
      },
    },
    {
      title: "STATUS",
      key: "status",
      responsive: ["md" as const],
      render: (record: Loan) => {
        return (
          <Tag
            color={
              record.status === "PENDING"
                ? "orange"
                : record.status === "APPROVED"
                ? "green"
                : "red"
            }
          >
            {record.status}
          </Tag>
        );
      },
    },
    {
      title: "ACTION",
      key: "action",
      responsive: ["md" as const],
      render: (record: Loan) => (
        <TableButtonActions
          record={{
            ...record,
            id: record.loanId,
          }}
          confirmDelete={confirmDelete}
          deleteLoading={loansStore.deletingLoan}
          viewDetails={() => viewDetails(record)}
          updateRecord={() => updateRecord(record)}
          deleteId={deleteId}
          deleteRecord={deleteRecord}
        />
      ),
    },
  ];

  const search = (value: string) => {
    const filterTable = searchTable(loansStore.loans, value);
    setFilterTable(filterTable);
  };

  const reload = () => {
    loansStore.getLoans();
  };

  return (
    <div>
      <Table
        scroll={{ x: "100%" }}
        columns={columns}
        dataSource={
          filterTable === null ? loansStore.loans : (filterTable as LoanList)
        }
        bordered
        loading={loansStore.loansLoading}
        rowKey="loanId"
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: loansStore.loans.length,
          pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
          showSizeChanger: true,
        }}
        title={() => (
          <TableTitle
            setFilterTableNull={setFilterTable}
            openAddModal={() => loansStore.setAddLoanModalOpen(true)}
            addNewText="Request Loan"
            refreshTable={reload}
            search={search}
            exportRecords={undefined}
          />
        )}
      />
    </div>
  );
};

export default LoansTable;

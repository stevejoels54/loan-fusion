import { Form } from "antd";
import { useEffect } from "react";
import AppInput from "../../../components/common/AppInput";
import AppButton from "../../../components/common/AppButton";
import AntdModal from "../../../components/common/AntdModal";
import { useLoansStore } from "../../../config/stores";
import { LoanUpdate } from "../../../types";
import AppError from "../../../components/common/AppError";
import { isEmpty } from "lodash";
import { customers } from "../../../config/constants";

const UpdateLoanForm = () => {
  const loansStore = useLoansStore();
  const [form] = Form.useForm();

  const { loanData } = loansStore;

  const onFinish = (values: LoanUpdate) => {
    loansStore.updateLoan(loanData.loanId, values);
  };

  useEffect(() => {
    form.setFieldsValue(loanData);
  }, [loanData, form]);

  return (
    <AntdModal
      title="EDIT LOAN"
      open={loansStore.editLoanModalOpen}
      closeModal={() => loansStore.setEditLoanModalOpen(false)}
    >
      {!isEmpty(loansStore.updateLoanError) ? (
        <AppError
          error={{
            message: loansStore.updateLoanError.error,
            errors: loansStore.updateLoanError.errors,
          }}
        />
      ) : null}
      <Form
        name="update-loan-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <AppInput
          name="customerId"
          label="Customer"
          type="select"
          inputAttributes={{
            options: customers.map((customer) => ({
              value: customer.customerId,
              label: customer.name,
            })),
          }}
          rules={[
            {
              required: true,
              message: "Please select a customer",
            },
          ]}
        />
        <AppInput
          name="loanAmount"
          label="Loan Amount"
          type="number"
          inputAttributes={{
            precision: 0,
            min: 1,
            addonBefore: "UGX",
            formatter: (value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          }}
          rules={[
            {
              required: true,
              message: "Please enter the loan amount",
            },
          ]}
        />
        <AppInput
          name="repaymentPeriod"
          label="Repayment Period"
          type="number"
          inputAttributes={{
            precision: 0,
            min: 1,
            addonAfter: "months",
          }}
          rules={[
            {
              required: true,
              message: "Please enter the repayment period",
            },
          ]}
        />
        <AppInput
          name="loanPurpose"
          label="Loan Purpose"
          type="textarea"
          rules={[
            {
              required: true,
              message: "Please enter the loan purpose",
            },
          ]}
        />
        <AppButton
          text="Edit Loan"
          loadingText="Editing Loan..."
          htmlType="submit"
          loading={loansStore.updatingLoan}
          className="w-100"
        >
          UPDATE LOAN
        </AppButton>
      </Form>
    </AntdModal>
  );
};

export default UpdateLoanForm;

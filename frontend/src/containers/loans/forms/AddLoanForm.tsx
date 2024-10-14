import { Form } from "antd";
import { useEffect } from "react";
import AppInput from "../../../components/common/AppInput";
import AppButton from "../../../components/common/AppButton";
import AntdModal from "../../../components/common/AntdModal";
import { useLoansStore } from "../../../config/stores";
import { Loan } from "../../../types";
import AppError from "../../../components/common/AppError";
import { isEmpty } from "lodash";
import { customers } from "../../../config/constants";

const AddLoanForm = () => {
  const loansStore = useLoansStore();
  const [form] = Form.useForm();

  const onFinish = (values: Loan) => {
    loansStore.createLoan(values);
  };

  useEffect(() => {
    form.resetFields();
  }, [loansStore.createLoanSuccess, form]);

  return (
    <AntdModal
      title="REQUEST LOAN"
      open={loansStore.addLoanModalOpen}
      closeModal={() => loansStore.setAddLoanModalOpen(false)}
    >
      {!isEmpty(loansStore.createLoanError) ? (
        <AppError
          error={{
            message: loansStore.createLoanError.error,
            errors: loansStore.createLoanError.errors,
          }}
        />
      ) : null}
      <Form
        name="request-loan-form"
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
          text="Request Loan"
          loadingText="Requesting Loan..."
          htmlType="submit"
          loading={loansStore.creatingLoan}
          className="w-100"
        />
      </Form>
    </AntdModal>
  );
};

export default AddLoanForm;

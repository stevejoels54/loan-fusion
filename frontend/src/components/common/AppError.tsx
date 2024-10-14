import React from "react";
import { Alert } from "antd";
import { isEmpty } from "lodash";

interface AppErrorProps {
  error: { message?: string; errors?: string[] };
}

const AppError: React.FC<AppErrorProps> = ({ error }) => {
  if (isEmpty(error)) return null;

  const renderErrorContent = () => {
    if (error.errors && error.errors.length > 0) {
      return (
        <ul style={{ paddingLeft: 20 }}>
          {error.errors.map((errMsg, index) => (
            <li key={index}>{errMsg}</li>
          ))}
        </ul>
      );
    }
    return error.message;
  };

  return (
    <div className="w-100">
      {isEmpty(error.errors) && error.message === "" ? null : (
        <Alert
          type="error"
          showIcon
          className="m-2"
          message={renderErrorContent()}
        />
      )}
    </div>
  );
};

export default AppError;

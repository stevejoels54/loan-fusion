import React, { ReactNode } from "react";
import { Button, ButtonProps } from "antd";

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  htmlType?: "submit" | "button" | "reset";
  loadingText?: string;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  block?: boolean;
  className?: string;
  variant?:
    | "link"
    | "text"
    | "dashed"
    | "outlined"
    | "solid"
    | "filled"
    | undefined;
  danger?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  loading = false,
  disabled = false,
  text = "Save",
  htmlType = "submit",
  loadingText = "Saving...",
  iconBefore = null,
  iconAfter = null,
  block = false,
  className = "",
  variant = undefined,
  danger = false,
  ...props
}) => {
  const buttonType: ButtonProps["type"] = props.type || "primary";

  return (
    <Button
      htmlType={htmlType}
      type={buttonType}
      variant={variant}
      disabled={disabled || loading}
      block={block}
      className={`text-sm ${className}`}
      loading={loading}
      icon={iconBefore}
      danger={danger}
      {...props}
    >
      {loading ? loadingText : text}
      {!loading && iconAfter}
    </Button>
  );
};

export default AppButton;

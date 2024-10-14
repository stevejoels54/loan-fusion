import React from "react";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  FormItemProps,
  SelectProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
  TimePickerProps,
} from "antd";
import { toUpper } from "lodash";
import { Rule } from "antd/lib/form";
import { TextAreaProps } from "antd/es/input/TextArea";

const { TextArea } = Input;

interface AppInputProps {
  name?: string;
  label?: string | null;
  type?:
    | "text"
    | "select"
    | "textarea"
    | "number"
    | "date"
    | "timer"
    | "password";
  rules?: Rule[];
  options?: SelectProps["options"];
  itemAttributes?: FormItemProps;
  inputAttributes?:
    | InputProps
    | InputNumberProps
    | DatePickerProps
    | TimePickerProps
    | SelectProps;
  allowClear?: boolean;
  showTimePicker?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  name = "",
  label = null,
  rules = [],
  itemAttributes = {},
  inputAttributes = {},
  type = "text",
  options = [],
  allowClear = false,
  showTimePicker,
}) => {
  return (
    <Form.Item
      key={name}
      label={label}
      name={name}
      rules={rules}
      className="mb-2"
      {...itemAttributes}
    >
      {type === "select" ? (
        <Select
          placeholder="Select option"
          showSearch
          allowClear={allowClear}
          filterOption={(input, option) =>
            toUpper(String(option?.label ?? "")).includes(toUpper(input))
          }
          options={options}
          {...(inputAttributes as SelectProps)}
        />
      ) : type === "textarea" ? (
        <TextArea rows={2} {...(inputAttributes as TextAreaProps)} />
      ) : type === "number" ? (
        <InputNumber
          style={{ width: "100%" }}
          {...(inputAttributes as InputNumberProps)}
        />
      ) : type === "date" ? (
        <DatePicker
          style={{ width: "100%" }}
          showTime={showTimePicker ? { format: "h:mm a" } : undefined}
          {...(inputAttributes as DatePickerProps)}
        />
      ) : type === "timer" ? (
        <TimePicker
          style={{ width: "100%" }}
          {...(inputAttributes as TimePickerProps)}
        />
      ) : type === "password" ? (
        <Input.Password {...(inputAttributes as InputProps)} />
      ) : (
        <Input {...(inputAttributes as InputProps)} />
      )}
    </Form.Item>
  );
};

export default AppInput;

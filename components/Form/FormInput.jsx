import { Form, Space, Row, Col } from "antd";
import {Border} from "../common/Border";
export const FormInput = ({
  name,
  label,
  rules,
  span,
  initialValue = "",
  autoFocus = false,
  placeholder,
  defaultValue,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      autoFocus={autoFocus}
      textarea
      initialValue={initialValue}
    >
      <Border span={span}>
        <input
          name={name}
          autoFocus={true}
          defaultValue={defaultValue}
          className="border w-full px-3 dark:bg-dark dark:border-main"
          placeholder={placeholder}
        />
      </Border>
    </Form.Item>
  );
};

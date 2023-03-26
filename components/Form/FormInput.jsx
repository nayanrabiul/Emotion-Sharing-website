import { Form, Space, Row, Col } from "antd";
import { Border } from "../common/Border";

const FormInput = ({
  name,
  label,
  justify,
  rules = [],
  type = "text",
  required = false,
  isNumber,
  textArea,
  span,
  initialValue = "",
  autoFocus = false,
  placeholder,
  defaultValue,
  onChange,
}) => {
  let initRules = [
    {
      required: required,
      message: <p className="text-cyan-900 my-1">Please provide a value</p>,
    },
  ];

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[...initRules, ...rules]}
      autoFocus={autoFocus}
      initialValue={initialValue}
    >
      {textArea ? (
        <Row justify={justify}>
          <Col
            className="bg-support border-2 border-black rounded relative flex"
            span={span}
            offset={(24 - span) / 2}
          >
            <div className="p-5 rounded">
              <textarea
                onChange={onChange}
                autoFocus={true}
                defaultValue={defaultValue}
                className="border w-full px-3 dark:bg-dark dark:border-main dark:text-support"
                placeholder={placeholder}
              />
              <input />
            </div>
          </Col>
        </Row>
      ) : (
        <div className="min-w-full">
          <Row justify={justify}>
            <Col
              className="bg-support border-2 border-black rounded relative flex"
              span={span}
              offset={(24 - span) / 2}
            >
              <div className="p-5 rounded">
                <input
                  onChange={onChange}
                  autoFocus={true}
                  defaultValue={defaultValue}
                  className="border w-full px-3 dark:bg-dark dark:border-main dark:text-support"
                  placeholder={placeholder}
                />
              </div>
            </Col>
          </Row>
          <div className="bg-support"></div>
        </div>
      )}
    </Form.Item>
  );
};
export default FormInput;




export const FormInputEdit = ({
  name,
  label,
  className,
  type = "text",
  required = false,
  initialValue = "",
  rules = [],
  dependencies = [],
  isEmail,
  readOnly,
  onChange,
  placeholder,
  textArea = false,
  style,
  disabledDate,
  autoComplete,
  span,
}) => {
  let initRules = [
    {
      required: required,
      message: `Please provide ${label?.toLowerCase() || "a value"}`,
    },
  ];
  if (isEmail === true) {
    initRules.push({
      type: "email",
      message: "Please enter a valid email address",
    });
  }

  return (
    <Form.Item
      name={name}
      className={className}
      label={label}
      dependencies={dependencies}
      initialValue={initialValue}
      rules={[...initRules, ...rules]}
    >
      {textArea ? (
        <textarea
          onChange={onChange}
          autoFocus={true}
          className="border-2 border-main rounded w-full  h-[122px] px-3 dark:bg-dark dark:border-main dark:text-support"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          readOnly={readOnly}
          onChange={onChange}
          placeholder={placeholder}
          style={style}
          autoComplete={autoComplete}
          className="w-full border-2 border-main rounded  px-3 dark:bg-dark dark:border-main dark:text-support"
        />
      )}
    </Form.Item>
  );
};

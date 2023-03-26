import { Form, Space, Row, Col } from "antd";
import { Border } from "../common/Border";

const FormInput = ({
  name,
  label,
  rules = [],
  required = false,

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
        <Row>
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
          <Row>
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

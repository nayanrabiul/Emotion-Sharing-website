import { Row, Col } from "antd";
export const Border = ({ children, justify, span = 16 }) => {
  return (
    <div className="min-w-full">
      <Row justify={justify}>
        <Col
          className="bg-support border-2 border-black rounded relative flex"
          span={span}
          offset={(24 - span) / 2}
        >
          <div className="p-5 rounded">{children}</div>
        </Col>
      </Row>
      <div className="bg-support"></div>
    </div>
  );
};

export const PostBorder = ({ children, justify, span = 16, className }) => {
  return (
    <div className={`min-w-full ${className}`}>
      <Row justify={justify}>
        <Col
          className="bg-support border-2 border-black rounded relative flex"
          span={span}
          offset={(24 - span) / 2}
        >
          <div className="h-[290px] rounded">{children}</div>
        </Col>
      </Row>
      <div className="bg-support"></div>
    </div>
  );
};
export const SearchBorder = ({ children, justify, span = 16, className }) => {
  return (
    <div className={`min-w-full ${className}`}>
      <Row justify={justify}>
        <Col
          className="bg-support border-2 border-black rounded relative flex"
          span={span}
          offset={(24 - span) / 2}
        >
          <div className="h-[100px] rounded">{children}</div>
        </Col>
      </Row>
      <div className="bg-support"></div>
    </div>
  );
};

export const HeroBorder = ({ children, justify, span = 16 }) => {
  return (
    <div className="min-w-full">
      <Row justify={justify}>
        <Col
          className="bg-support border-2 border-black rounded relative flex"
          span={span}
          offset={(24 - span) / 2}
        >
          <div className="p-7 w-full rounded">{children}</div>
        </Col>
      </Row>
      <div className="bg-support"></div>
    </div>
  );
};



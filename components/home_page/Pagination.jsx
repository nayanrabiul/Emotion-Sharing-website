import React, { useEffect, useState } from "react";
import { Pagination, Row } from "antd";
const Paginate = ({ setPageLimit, setPageNumber, totalPostCount }) => {
  // const [query, setQuery] = useState({_page: 1, _limit: 10});
  const handlePageChange = (_page, _limit) => {
    setPageNumber(_page);
    setPageLimit(_limit);
  };
  return (
    <div>
      <Row justify="space-between dark:bg-support rounded p-1">
        <Pagination
          showSizeChanger
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
          defaultCurrent={1}
          total={totalPostCount}
          showQuickJumper
        />
      </Row>
    </div>
  );
};

export default Paginate;

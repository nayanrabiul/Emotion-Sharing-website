import React, { useEffect, useState } from "react";
import { useFetch } from "../../helpers/hooks.js";
import Paginate from "./Pagination.jsx";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { Border, PostBorder } from "../common/Border.jsx";
import { BsArrowRight } from "react-icons/bs";
import { trimDescription } from "../../helpers/trim_text";
import { Link, Navigate } from "react-router-dom";
import { Skeleton } from "antd";

const Posts = ({ url }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPostCount, setTotalPostCount] = useState(0);

  const [posts, getPosts, { headers, loading }] = useFetch(url.fetch, {
    ...url.query,
    _expand: "user",
    _page: pageNumber,
    _limit: pageLimit,
  });

  //set pagination data
  useEffect(() => {
    getPosts({ _page: pageNumber, _limit: pageLimit });
  }, [pageNumber, pageLimit]);

  //fetch total post counts
  useEffect(() => {
    if (url._paginationFromHeader && headers && headers["x-total-count"])
      setTotalPostCount(parseInt(headers["x-total-count"], 10));
    else setTotalPostCount(posts?.length);
  }, [headers]);

  if (loading) {
    return (
      <Row className="mt-6">
        {[...Array(10).keys()]?.map((index) => (
          <Col xs={12} md={12} xl={8} className={"p-3"} key={index}>
            <Skeleton loading={loading} active></Skeleton>;
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div className="mx-auto mt-6">
      <Row>
        {posts?.map((post, index) => (
          <Col xs={12} md={12} xl={8} className={"p-1"}>
            <PostBorder span={24}>
              <div
                key={post?.id}
                className="h-[230px] relative border bg-white p-2 rounded dark:bg-dark dark:border-main"
              >
                <h2
                  onClick={() => navigate(`/post/${post?.id}`)}
                  className="text-lg cursor-pointer text-cyan-800 font-semibold "
                >
                  {post?.title}
                </h2>
                {/* user informatin */}
                <Link to={`/user-profile/${post?.user?.id}`}>
                  <div className="flex justify-between my-1 overflow-hidden">
                    <p className="text-gray-400">@{post.user.username}</p>
                    <p className="text-gray-400 ">{post?.user?.email}</p>
                  </div>
                </Link>
                {/* post content */}
                <p className="text-gray-500">{trimDescription(post?.body)}</p>
                <button
                  onClick={() => navigate(`/post/${post?.id}`)}
                  className="center space-x-2 absolute bottom-2 right-2 p-1 hover:bg-main rounded cursor-pointer"
                >
                  <p className="text-cyan-800">Read mode </p>
                  <BsArrowRight fill="#010014" />
                </button>
              </div>
            </PostBorder>
          </Col>
        ))}
      </Row>

      <div className={"flex justify-end py-4"}>
        <Paginate
          setPageLimit={setPageLimit}
          setPageNumber={setPageNumber}
          totalPostCount={totalPostCount}
        />
      </div>
    </div>
  );
};

export default Posts;

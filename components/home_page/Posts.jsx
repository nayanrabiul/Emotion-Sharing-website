import React, { useEffect, useState, useContext } from "react";
import { useAction, useFetch } from "../../helpers/hooks.js";
import Paginate from "./Pagination.jsx";
import { useNavigate } from "react-router-dom";
import { Col, Row, Dropdown, Form, Skeleton, Modal, Spin } from "antd";
import { Border, PostBorder } from "../common/Border.jsx";
import { BsArrowRight } from "react-icons/bs";
import { trimDescription } from "../../helpers/trim_text";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import FormInput, { FormInputEdit } from "../Form/FormInput.jsx";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../common/alert.js";
import { deletePost, putPost } from "../../helpers/backend_helper.js";

const Posts = ({ url }) => {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
            <Skeleton loading={loading} active></Skeleton>
          </Col>
        ))}
      </Row>
    );
  }

  const onFinish = async (values) => {
    console.log(values);
    try {
      setSpinning(true);
      useAction(
        putPost,
        {
          title: values.title,
          body: values.body,
          userId: values.userId,
        },
        (d) => {
          if (d.status >= 200 && d.status < 300) {
            openSuccessNotification(
              `Post Successfull updated`,
              <p>
                <span className="text-cyan-600 font-medium mr-1">Title :</span>
                {d.data.title} <br />
                <span className="text-cyan-600 font-medium mr-1"> Body :</span>
                {d.data.body} <br />
                <span className="text-cyan-600 font-medium mr-1">Id :</span>
                {d.data.id} <br />
              </p>
            );
            setSpinning(false);
          } else {
            openErrorNotification("Failed to Update Posts");
            setSpinning(false);
          }
        }
      );
    } catch (error) {
      setSpinning(false);

      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-6">
      <Row>
      <Spin className="fixed top-3 right-3" spinning={spinning} />
        {posts?.map((post, index) => (
          <Col xs={12} md={12} xl={8} className={"p-1"}>
            <PostBorder span={24}>
              <div
                key={post?.id}
                className="h-[230px] relative border bg-white p-2 rounded dark:bg-dark dark:border-main"
              >
                {/* render post option if current user own this post
                 */}
                <div
                  key={index}
                  className={`${
                    user?.id === post?.userId ? "absolute" : "hidden"
                  } bg-white dark:bg-dark dark:shadow dark:shadow-support rounded p-1 right-2 top-2  flex justify-end space-x-1 `}
                >
                  <CiEdit
                    className="cursor-pointer "
                    onClick={() => {
                      form.resetFields();
                      setIsModalVisible(true);
                      form.setFieldsValue({ ...post });
                    }}
                  />

                  <MdDelete
                    onClick={async () => {
                      setSpinning(true);
                      await deletePost(`/posts/${post.id}`).then((d) => {
                        openSuccessNotification(
                          `Post Successfull Deleted`,
                          <p>
                            <span className="text-cyan-600 font-medium mr-1">
                              Title :
                            </span>
                            {post.title} <br />
                            <span className="text-cyan-600 font-medium mr-1">
                              {" "}
                              Body :
                            </span>
                            {post.body} <br />
                            <span className="text-cyan-600 font-medium mr-1">
                              Id :
                            </span>
                            {post.id} <br />
                          </p>
                        );
                        setSpinning(false);
                        getPosts({ _page: pageNumber, _limit: pageLimit });
                      });
                    }}
                  />
                </div>
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

      <div>
        <Modal
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <FormInputEdit
              span={24}
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
            />

            <FormInputEdit
              span={24}
              textArea
              label="Body"
              name="body"
              rules={[{ required: true, message: "Please input the body!" }]}
            />
            <FormInputEdit
              className={"hidden"}
              span={24}
              label="User ID"
              name="userId"
              rules={[
                {
                  required: true,
                  message: "Please input the user ID!",
                },
              ]}
            />
            <Border>
              <button className="border bg-main">Submit</button>
            </Border>
            <Spin className="my-2" spinning={spinning} />
          </Form>
        </Modal>
      </div>

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

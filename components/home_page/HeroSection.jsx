import React, { useState } from "react";
import { Modal, Form, Input, Button, Row, Col, Spin } from "antd";
import axios from "axios";
import { Border } from "../common/Border";
import { useAction } from "../../helpers/hooks";
import { postPost } from "../../helpers/backend_helper";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../common/alert";
import FormInput from "../Form/FormInput";

const HeroSection = () => {
  const [spinning, setSpinning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      setSpinning(true);
      useAction(
        postPost,
        {
          title: values.title,
          body: values.body,
          userId: values.userId,
        },
        (d) => {
          if (d.status >= 200 && d.status < 300) {
            openSuccessNotification(
              `Post Successfull`,
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
            openErrorNotification("Failed to Posts");
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
    <div className="min-w-full">
      <Row justify={"start"}>
        <Col
          className="bg-support border-2 border-black rounded relative flex"
          span={24}
        >
          <div className="h-[250px] rounded">
            <div className="w-full border relative h-[200px] rounded-lg bg-main center">
              <img
                className="w-11 h-11 absolute top-6 left-32"
                src="/sad.svg"
              />
              <img
                className="w-11 h-11 absolute bottom-2 left-24"
                src="/heart.svg"
              />

              <img
                className="w-11 h-11 absolute top-8 right-32"
                src="/smile.svg"
              />
              <img
                className="w-11 h-11 absolute bottom-12 right-32"
                src="/double-heart.svg"
              />

              <div className="p-4 relative center">
                <div className="w-[55%] relative text-center">
                  <img
                    className=" w-11 h-11 absolute left-20 -top-6"
                    src="/highlight.svg"
                  />
                  <h1 className="text-4xl mb-4 font-bold text-white">
                    Share Your Feeling
                  </h1>
                  <p className="text-supporot text-white">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                    massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                    sapien fringilla, mattis ligula consectetur, ’
                  </p>
                </div>
              </div>
              <div className="w-[70%] md:w-[60%] absolute -bottom-4 ">
                <Border justify={"center"}>
                  <button
                    className=" border  text-cyan-600  bg-white font-semibold py-2 px-4 rounded dark:bg-dark dark:border-main dark:text-gray-200"
                    onClick={showModal}
                  >
                    What's on your Heart...?
                  </button>
                </Border>
              </div>
              <Modal
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <FormInput
                    span={24}
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please input the title!" },
                    ]}
                  />

                  <FormInput
                    span={24}
                    textArea
                    label="Body"
                    name="body"
                    rules={[
                      { required: true, message: "Please input the body!" },
                    ]}
                  />

                  <FormInput
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
          </div>
        </Col>
      </Row>
      <div className="bg-support"></div>
    </div>
  );
};

export default HeroSection;

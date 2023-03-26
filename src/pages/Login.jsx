import { Col, Form, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../components/common/alert.js";
import { Border } from "../../components/common/Border.jsx";
import FormInput from "../../components/Form/FormInput.jsx";
import Layout from "../../components/layout/Layout.jsx";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import { fetchUsers } from "../../helpers/backend_helper.js";
import { useFetch } from "../../helpers/hooks";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [userProfile, getUserProfile] = useFetch(fetchUsers, {}, false); //dont load initially

  useEffect(() => {
    if (!!userProfile) {
      if (userProfile?.length > 0) {
        form.resetFields();
        setUser(userProfile[0]);
        localStorage.setItem("user", JSON.stringify(userProfile[0]));
        openSuccessNotification(
          `User ${userProfile[0].username} logged in Successfully`
        );
        navigate(`/user/${userId}`);
      } else {
        console.log("er");
        openErrorNotification(
          `Wrong Credential`,
          "Please enter correct 'userId' to login..."
        );
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (!!userId) {
      getUserProfile({ id: userId });
    }
  }, [userId]);

  const handleFinish = async (values) => {
    console.log(values, "fajslkjkf");
    setUserId(values.userID);
  };

  return (
    <Layout>
      <div className="w-full min-h-screen p-32">
        <div className=" w-full h-[70vh]">
          <Row className="h-full ">
            <Col className="center" span={10}>
              <img src="theme_pic.svg" alt="Theme Picture"></img>
            </Col>
            <Col className="center bg-main rounded " span={14}>
              <div className={"w-full"}>
                <Form
                  form={form}
                  className="px-32"
                  layout="vertical"
                  onFinish={handleFinish}
                >
                  <FormInput
                    span={24}
                    justify="start"
                    placeholder="Enter User Id..."
                    name={"userID"}
                    required
                  />
                  <Border>
                    <button className="border bg-main text-cyan-700">
                      submit
                    </button>
                  </Border>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAction, useFetch } from "../../helpers/hooks.js";
import HeroSection from "../../components/home_page/HeroSection.jsx";
import { Col, Row, Skeleton, Form, Spin } from "antd";
import {
  fetchPosts,
  fetchUsers,
  postComments,
} from "../../helpers/backend_helper.js";
import TrendingPost from "../../components/home_page/TrendingPost.jsx";
import { GoCommentDiscussion } from "react-icons/go";
import { BiSend } from "react-icons/bi";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../common/alert.js";
import FormInput from "../Form/FormInput.jsx";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const [commentInput, setCommentInput] = useState(-1);
  const [spinning, setSpinning] = useState(false);

  const [isTablet, setTablet] = useState(window.innerWidth > 768);
  const updateMedia = () => {
    setTablet(window.innerWidth > 768);
  };

  const [data, getPost, { loading }] = useFetch(fetchPosts, {
    id,
    _embed: "comments",
  });
  const [userData, getUser, { loading1 }] = useFetch(fetchUsers, {}, false);

  // if id change reFetch Post
  useEffect(() => {
    if (!!id) {
      getPost({
        id,
        _embed: "comments",
      });
    }
  }, [id]);

  useEffect(() => {
    if (!!data) {
      setPost(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!!userData) {
      setProfile(userData[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (!!post) {
      getUser({ id: post.userId });
    }
  }, [post]);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (loading) {
    return (
      <Row className="mt-6">
        {[...Array(10).keys()]?.map((index) => (
          <Col span={13} className={"p-3"} key={index}>
            <Skeleton loading={loading} active></Skeleton>;
          </Col>
        ))}
      </Row>
    );
  }

  const onFinish = async (values) => {
    if (!user) {
      openErrorNotification("Unable to Comment", "Please Log-In first...");
    } else {
      setSpinning(true);
      await useAction(postComments, { postId: post.id, data: values }, (d) => {
        setSpinning(false);
        openSuccessNotification(
          `Comment Successfull`,
          <p>
            <span className="text-cyan-600 font-medium mr-1">Comment :</span>
            {d.data.data.comment} <br />
            <span className="text-cyan-600 font-medium mr-1"> postId :</span>
            {d.data.postId} <br />
            <span className="text-cyan-600 font-medium mr-1">Id :</span>
            {d.data.id} <br />
          </p>
        );
      });
      setSpinning(false);
    }
  };
  return (
    <div>
      <Spin className="fixed top-3 right-3" spinning={spinning} size="large" />
      <HeroSection />
      {isTablet ? (
        <Row gutter={10}>
          <Col span={16} className="mt-6">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
              {/* user details  */}
              <div
                onClick={() => navigate(`/user-profile/${profile?.id}`)}
                className="flex cursor-pointer justify-between my-1"
              >
                <p className="text-gray-400">@{profile?.username}</p>
                <p className="text-gray-400 ">{profile?.email}</p>
              </div>
              <p className="mb-12">{post?.body}</p>

              <br />
              <p className="text-lg my-4">Make Comments</p>
              <Form form={form} onFinish={onFinish}>
                <Row gutter={4}>
                  <Col span={22}>
                    <FormInput
                      span={24}
                      placeholder="Enter Comment..."
                      name={"comment"}
                    />
                  </Col>
                  <Col span={2} className="center">
                    <button>
                      <BiSend fill="#B9E0FF" className="h-8 w-8" />
                    </button>
                  </Col>
                </Row>
              </Form>

              {/* comment  */}
              <p className="text-lg my-4">
                <span className="text-xl text-cyan-700 mr-2">
                  {post?.comments?.length}
                </span>
                Comments
              </p>
              {post?.comments?.map((comment, index) => (
                <div
                  key={index}
                  className={`${
                    commentInput === index
                      ? "my-8 border-2 rounded-xl shadow dark:shadow-support"
                      : ""
                  }`}
                >
                  <div className="relative shadow shadow-dark dark:shadow-support dark:bg-dark p-3 rounded-lg mb-4">
                    <p className="mt-2 dark:text-gray-700 text-sm text-gray-300 font-medium">
                      {comment.email}
                    </p>
                    <h2 className="text-lg font-semibold">{comment.name}</h2>
                    <p className="dark:text-gray-200  text-gray-500">
                      {comment.body}
                    </p>
                    <div
                      className="absolute bottom-3 right-3 center hover:cursor-pointer"
                      onClick={() => {
                        if (!user) {
                          openErrorNotification(
                            "Unable to Comment",
                            "Please Log-In first..."
                          );
                        } else {
                          setCommentInput(index === commentInput ? -1 : index);
                        }
                      }}
                    >
                      <GoCommentDiscussion fill="#B9E0FF" />
                      <p className="ml-2">Reply</p>
                    </div>
                  </div>

                  <Form form={form} onFinish={onFinish}>
                    <Row
                      gutter={4}
                      className={`${
                        commentInput === index ? "flex" : "hidden"
                      }`}
                    >
                      <Col span={22}>
                        <FormInput
                          span={24}
                          placeholder="Enter Comment..."
                          name={"comment"}
                        />
                      </Col>
                      <Col span={2} className="center">
                        <button>
                          <BiSend fill="#B9E0FF" className="h-8 w-8" />
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              ))}
            </div>
          </Col>
          <Col span={8}>
            <TrendingPost />
            <Profile profile={profile} />
          </Col>
        </Row>
      ) : (
        <Row gutter={10}>
          <Col span={24}>
            <TrendingPost />
          </Col>
          <Col span={24}>
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
              <p className="mb-8">{post?.body}</p>

              {/* comment  */}
              <p className="text-lg my-4">
                <span className="text-xl text-cyan-700 mr-2">
                  {post?.comments?.length}
                </span>
                Comments
              </p>
              {post?.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className=" shadow shadow-dark dark:shadow-support dark:bg-dark p-4 rounded-lg mb-4"
                >
                  <p className="mt-2 dark:text-gray-700 text-sm text-gray-300 font-medium">
                    {comment.email}
                  </p>
                  <h2 className="text-lg font-semibold">{comment.name}</h2>
                  <p className="dark:text-gray-200  text-gray-500">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
            <Profile profile={profile} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Post;

const Profile = ({ profile }) => {
  return (
    <div className="mt-6 max-w-xl mx-auto p-8 rounded border-4 border-support text-cyan-800">
      <h1 className="text-4xl font-bold mb-4 text-center text-main">
        {profile ? profile?.username : null}
      </h1>
      <div className="flex justify-center items-center mb-8">
        <div className="h-1 bg-main mr-2 flex-grow"></div>
        <div className="text-gray-500 text-lg font-semibold">
          {profile?.name}
        </div>
        <div className="h-1 bg-main ml-2 flex-grow"></div>
      </div>

      <div className="bg-white p-4 rounded-lg  flex-grow mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">{profile?.email}</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Phone:</span> {profile?.phone}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Website:</span>
          {profile?.website}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg  flex-grow mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">Address</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Street:</span>{" "}
          {profile?.address?.street || ""}, {profile?.address?.suite || ""}
        </p>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">City:</span>{" "}
          {profile?.address?.city || ""}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Zipcode:</span>{" "}
          {profile?.address?.zipcode || ""}
        </p>
        <p className="text-lg mt-4">
          <span className="text-main font-bold">Geolocation:</span>{" "}
          {profile?.address?.geo?.lat || ""}, {profile?.address?.geo?.lng || ""}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">Company</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Name:</span>{" "}
          {profile?.company?.name || ""}
        </p>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Catchphrase:</span>{" "}
          {profile?.company?.catchPhrase || ""}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Business:</span>{" "}
          {profile?.company?.bs || ""}
        </p>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../helpers/hooks.js";
import HeroSection from "../../components/home_page/HeroSection.jsx";
import { Col, Row, Skeleton } from "antd";
import { fetchPosts, fetchUsers } from "../../helpers/backend_helper.js";
import TrendingPost from "../../components/home_page/TrendingPost.jsx";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  const [isTablet, setTablet] = useState(window.innerWidth > 768);
  const updateMedia = () => {
    setTablet(window.innerWidth > 768);
  };

  const [data, getPost, { loading }] = useFetch(fetchPosts, {
    id,
    _embed: "comments",
  });
  const [userData, getUser, { loading1 }] = useFetch(fetchUsers, {}, false);

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
      setUser(userData[0]);
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

  return (
    <div>
      <HeroSection />
      {isTablet ? (
        <Row gutter={10}>
          <Col span={16} className="mt-6">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
              <div className="flex justify-between my-2">
                <p
                  onClick={() => navigate(`/user-profile/${user?.id}`)}
                  className="text-gray-400"
                >
                  @{user?.username}
                </p>
                <p className="text-gray-400 ">{user?.email}</p>
              </div>
              <p className="mb-12">{post?.body}</p>

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
          </Col>
          <Col span={8}>
            <TrendingPost />
            <Profile user={user} />
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
            <Profile user={user} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Post;

const Profile = ({ user }) => {
  return (
    <div className="mt-6 max-w-xl mx-auto p-8 rounded border-4 border-support text-cyan-800">
      <h1 className="text-4xl font-bold mb-4 text-center text-main">
        {user ? user?.username : null}
      </h1>
      <div className="flex justify-center items-center mb-8">
        <div className="h-1 bg-main mr-2 flex-grow"></div>
        <div className="text-gray-500 text-lg font-semibold">{user?.name}</div>
        <div className="h-1 bg-main ml-2 flex-grow"></div>
      </div>

      <div className="bg-white p-4 rounded-lg  flex-grow mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">{user?.email}</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Phone:</span> {user?.phone}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Website:</span>
          {user?.website}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg  flex-grow mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">Address</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Street:</span>{" "}
          {user?.address?.street || ""}, {user?.address?.suite || ""}
        </p>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">City:</span>{" "}
          {user?.address?.city || ""}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Zipcode:</span>{" "}
          {user?.address?.zipcode || ""}
        </p>
        <p className="text-lg mt-4">
          <span className="text-main font-bold">Geolocation:</span>{" "}
          {user?.address?.geo?.lat || ""}, {user?.address?.geo?.lng || ""}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">Company</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Name:</span>{" "}
          {user?.company?.name || ""}
        </p>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Catchphrase:</span>{" "}
          {user?.company?.catchPhrase || ""}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Business:</span>{" "}
          {user?.company?.bs || ""}
        </p>
      </div>
    </div>
  );
};

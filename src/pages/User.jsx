import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeroSection from "../../components/home_page/HeroSection.jsx";
import { Col, Row, Skeleton } from "antd";
import Posts from "../../components/home_page/Posts.jsx";
import { fetchPosts, fetchUsers } from "../../helpers/backend_helper.js";
import TrendingPost from "../../components/home_page/TrendingPost.jsx";
import { useFetch } from "../../helpers/hooks.js";
import {
  Border,
  HeroBorder,
  UserProfileBorder,
} from "../../components/common/Border.jsx";

const User = () => {
  const { id } = useParams();
  const [user, setUser, { loading }] = useFetch(fetchUsers, { id });
  const [isTablet, setTablet] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setTablet(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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
    <div>
      <HeroSection />
      {isTablet ? (
        <Row gutter={10}>
          <Col span={16} className="mt-6">
            <UserProfileBorder justify={"center"} span={16}>
              <div className="border text-center p-3 bg-main text-xl font-semibold mb-4">
                <p>All Post by {user[0].username}</p>
                <div className="flex text-sm justify-around my-1 overflow-hidden">
                  <p className="">Name : {user[0].name}</p>
                  <p className=" ">Email : {user[0].email}</p>
                </div>
              </div>
            </UserProfileBorder>

            <Posts
              url={{
                fetch: fetchPosts,
                query: { userId: id },
                _paginationFromHeader: false,
              }}
            />
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
            <Posts
              url={{
                fetch: fetchPosts,
                query: { userId: id },
                _paginationFromHeader: false,
              }}
            />
            <Profile user={user} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default User;

const Profile = ({ user }) => {
  return (
    <div className="mt-6 max-w-xl mx-auto p-8 rounded border-4 border-support text-cyan-800">
      <h1 className="text-4xl font-bold mb-4 text-center text-main">
        {user[0]?.username}
      </h1>
      <div className="flex justify-center items-center mb-8">
        <div className="h-1 bg-main mr-2 flex-grow"></div>
        <div className="text-gray-500 text-lg font-semibold">
          {user[0]?.name}
        </div>
        <div className="h-1 bg-main ml-2 flex-grow"></div>
      </div>

      <div className="bg-white p-4 rounded-lg  flex-grow mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">{user[0]?.email}</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Phone:</span> {user[0]?.phone}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Website:</span>{" "}
          {user[0]?.website}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg  flex-grow mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">Address</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Street:</span>{" "}
          {user[0]?.address.street}, {user[0]?.address.suite}
        </p>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">City:</span>{" "}
          {user[0]?.address.city}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Zipcode:</span>{" "}
          {user[0]?.address.zipcode}
        </p>
        <p className="text-lg mt-4">
          <span className="text-main font-bold">Geolocation:</span>{" "}
          {user[0]?.address.geo.lat}, {user[0]?.address.geo.lng}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-main">Company</h2>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Name:</span>{" "}
          {user[0]?.company.name}
        </p>
        <p className="text-lg mb-2">
          <span className="text-main font-bold">Catchphrase:</span>{" "}
          {user[0]?.company.catchPhrase}
        </p>
        <p className="text-lg">
          <span className="text-main font-bold">Business:</span>{" "}
          {user[0]?.company.bs}
        </p>
      </div>
    </div>
  );
};

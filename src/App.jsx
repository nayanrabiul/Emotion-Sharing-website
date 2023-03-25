import React, { useEffect, useState } from "react";
import Posts from "../components/home_page/Posts.jsx";
import TrendingPost from "../components/home_page/TrendingPost.jsx";
import { Col, Row } from "antd";
import HeroSection from "../components/home_page/HeroSection.jsx";
import { fetchPosts } from "../helpers/backend_helper.js";

const App = () => {
  const [isTablet, setTablet] = useState(window.innerWidth > 768);
  const updateMedia = () => {
    setTablet(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  console.log(isTablet);

  return (
    <div>
      <HeroSection />
      {isTablet ? (
        <Row gutter={10}>
          <Col span={16}>
            <Posts url={{ fetch: fetchPosts, _paginationFromHeader: true }} />
          </Col>
          <Col span={8}>
            <TrendingPost />
          </Col>
        </Row>
      ) : (
        <Row gutter={10}>
          <Col span={24}>
            <TrendingPost />
          </Col>
          <Col span={24}>
            <Posts url={{ fetch: fetchPosts, _paginationFromHeader: true }} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default App;

import React, {useEffect, useState} from "react";
import Posts from "../components/home_page/Posts.jsx";
import TrendingPost from "../components/home_page/TrendingPost.jsx";
import {Col, Row} from "antd";
import HeroSection from "../components/home_page/HeroSection.jsx";
import {fetchPosts} from "../helpers/backend_helper.js";

const App = () => {

    return (
        <div>
            <HeroSection/>
            <Row gutter={10}>
                <Col span={16}><Posts url={{fetch: fetchPosts,_paginationFromHeader:true}}/></Col>
                <Col span={8}><TrendingPost/></Col>
            </Row>
        </div>);
};

export default App;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { HeroBorder, PostBorder } from "../common/Border";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../helpers/hooks";
import { fetchPosts } from "../../helpers/backend_helper";
import { Skeleton } from "antd";

const TrendingPost = () => {
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const [data, getTrendingPosts, { loading }] = useFetch(fetchPosts, {
    id: getRandomNumber(1, 100),
    _expand: "user",
  });

  const [trendingPosts, setPost] = useState({});

  //extract first items
  useEffect(() => {
    if (data) {
      setPost(data[0]);
    }
  }, [data]);

  const fetchTrendingPosts = () => {
    getTrendingPosts({
      id: getRandomNumber(1, 100),
    });
  };

  const startInterval = () => {
    intervalRef.current = setInterval(fetchTrendingPosts, 10000); // Refresh every 10 seconds
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
    startInterval();
    return () => {
      stopInterval();
    };
  }, []);

  if (loading) {
    return <Skeleton className="mt-6" loading={loading} active></Skeleton>;
  }
  return (
    <div className="mt-7 container mx-auto">
      <HeroBorder span={24}>
        <div className="border text-center p-3 bg-main text-2xl font-semibold mb-4">
          Trending Posts
        </div>
      </HeroBorder>
      <PostBorder span={24} className="mt-3">
        <div
          key={trendingPosts?.id}
          className="h-[230px] relative border  bg-white p-2 rounded dark:bg-dark dark:border-main"
        >
          <h2
            onClick={() => navigate(`/post/${trendingPosts?.id}`)}
            className="text-lg text-cyan-800 cursor-pointer font-semibold"
          >
            {trendingPosts?.title}
          </h2>
          <div
            onClick={() => navigate(`/user-profile/${trendingPosts?.user?.id}`)}
            className="flex cursor-pointer justify-between my-1"
          >
            <p className="text-gray-400">@{trendingPosts?.user?.username}</p>
            <p className="text-gray-400 ">{trendingPosts?.user?.email}</p>
          </div>
          <p className="text-gray-500">{trendingPosts?.body}</p>

          <button className="center space-x-2 absolute bottom-2 right-2 p-1 hover:bg-main rounded cursor-pointer">
            <p className="text-cyan-800">Read mode </p>
            <BsArrowRight fill="#010014" />
          </button>
        </div>
      </PostBorder>
    </div>
  );
};
export default TrendingPost;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

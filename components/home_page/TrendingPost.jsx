import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { HeroBorder, PostBorder } from "../common/Border";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {trimDescription} from "../../helpers/trim_text";

const TrendingPost = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const intervalRef = useRef(null);
    const navigate = useNavigate();

  const fetchTrendingPosts = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${getRandomNumber(1, 100)}`
      );
      setTrendingPosts(response.data);
    } catch (error) {
      console.error("Error fetching trending posts:", error);
    }
  };

  const startRefreshInterval = () => {
    intervalRef.current = setInterval(fetchTrendingPosts, 10000); // Refresh every 30 seconds
  };

  const stopRefreshInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
    startRefreshInterval();
    return () => {
      stopRefreshInterval();
    };
  }, []);

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
          className="h-[230px] relative border cursor-pointer bg-white p-2 rounded dark:bg-dark dark:border-main"
          onClick={() => navigate(`/post/${trendingPosts.id}`)}
        >
          <h2 className="text-lg text-cyan-800 font-semibold">
            {trendingPosts?.title}
          </h2>
          <p className="text-gray-500">
            {trendingPosts?.body}
          </p>

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



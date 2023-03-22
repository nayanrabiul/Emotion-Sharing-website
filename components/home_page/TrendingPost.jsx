import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';

const TrendingPost = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const intervalRef = useRef(null);

    const fetchTrendingPosts = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${getRandomNumber(1, 100)}`);
            setTrendingPosts(response.data);
        } catch (error) {
            console.error('Error fetching trending posts:', error);
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
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Trending Posts</h2>
            <ul className="divide-y divide-gray-200">

                    <li  className="py-4">
                        <h3 className="text-lg font-semibold">{trendingPosts.title}</h3>
                        <p className="text-gray-500">{trendingPosts.body}</p>
                    </li>

            </ul>
        </div>
    );
};
export default TrendingPost;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
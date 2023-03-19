import React, {useEffect, useState} from "react"
import {Col, Row} from "antd";
import {useFetch} from "../helpers/hooks.js";
import {fetchPosts} from "../helpers/backend_helper.js";
import {Link} from "react-router-dom";
import Post from "./post.jsx";

const App = () => {
    const [posts, setPosts] = useFetch(fetchPosts)

    return (<div>
        <div className={'flex flex-wrap'}>
            <Link to="/" component={Post}>Home</Link>
            {posts?.map(post => (

                <div key={post.id} className={'rounded p-4 bg-amber-50 shadow-2xl w-1/4 m-2'}>
                    <p className={'text-2xl font-bold'}>{post.title}</p>
                    <p>{post.body}</p>

                </div>

            ))}
        </div>
    </div>);
}

export default App;
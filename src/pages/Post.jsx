import React from 'react';
import {Link} from "react-router-dom";
import {useFetch} from "../../helpers/hooks.js";
import {fetchPosts} from "../../helpers/backend_helper.js";

const Post = () => {
    const [posts,setPosts] = useFetch(fetchPosts);
    return (
        <div>

        </div>
    );
};

export default Post;

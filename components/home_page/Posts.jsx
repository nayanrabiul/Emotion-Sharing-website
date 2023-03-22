import React, {useEffect, useState} from "react";
import {useFetch} from "../../helpers/hooks.js";
import axios from "axios";
import Paginate from "./Pagination.jsx";
import {fetchPosts} from "../../helpers/backend_helper.js";
import { useNavigate } from "react-router-dom";

const Posts = () => {
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalPostCount, setTotalPostCount] = useState(0);

    const [posts, getPosts, headers] = useFetch(fetchPosts, {_page: pageNumber, _limit: pageLimit});

    //set pagination data
    useEffect(() => {
        getPosts({_page: pageNumber, _limit: pageLimit});
    }, [pageNumber, pageLimit]);

    //fetch total post counts
    useEffect(() => {
        if (headers)
            setTotalPostCount(parseInt(headers['x-total-count'], 10));
    }, [headers]);


    return (<div className=" mx-auto">
        <ul className="divide-y divide-gray-200">
            {
                posts?.map((post, index) => (
                    <li key={post?.id}
                        className="py-4 hover:bg-red-100 hover:cursor-pointer"
                    onClick={()=>  navigate(`/post/${post?.id}`)}>
                        <h2 className="text-lg font-semibold">{post?.title}</h2>
                        <p className="text-gray-500">{post?.body}</p>
                    </li>
                ))
            }
        </ul>
        <div className={'flex justify-end py-4'}>
            <Paginate setPageLimit={setPageLimit} setPageNumber={setPageNumber} totalPostCount={totalPostCount}/>
        </div>
    </div>);
};

export default Posts;
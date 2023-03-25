import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFetch } from "../../helpers/hooks.js";
import { fetchPosts } from "../../helpers/backend_helper.js";

const Post = () => {
  const { id } = useParams();
  const [data, getPost, { loading }] = useFetch(fetchPosts, {
    id,
    _embed: "comments",
  });
  const [post, setPost] = useState({});

  useEffect(() => {
    if (data) {
      setPost(data[0]);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="mb-8">{post?.body}</p>
      {post?.comments?.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">{comment.name}</h2>
          <p className="text-gray-700">{comment.body}</p>
          <p className="mt-2 text-sm font-medium">{comment.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;

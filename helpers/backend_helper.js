import { del, get, post,put } from "./api_helper";

//post api
export const fetchPosts = (data) => get("/posts", data);
export const postPost = (data) => post("/posts", data);
export const putPost = (data) => put("/posts", data);
export const deletePost = (data) => del(data);

//user api
export const fetchUsers = (data) => get("/users", data);

//comment api
export const fetchComments = (data) => get("/comments", data);

export const postComments = (data) => post("/comments", data);


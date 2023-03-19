import {del, get, post} from "./api_helper"


//post api
export const fetchPosts = data => get('/posts', data)
export const postPost = data => post('/posts', data)
export const putPost = data => put('/posts', data)
export const deletePost = data => del('/posts', data)

//user api
export const fetchUsers = data => get('/users', data)

//comment api
export const fetchComments = data => get('/comments', data)

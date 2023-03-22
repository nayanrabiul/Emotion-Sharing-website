import {createBrowserRouter} from "react-router-dom";

import Post from '../components/home_page/Post';
import Posts from '../components/home_page/Posts';
import User from '../src/pages/User';
import CheckUser from "./route_helper/CheckUser";
import CheckLogin from "./route_helper/CheckLogin";
import Layout from "../components/layout/Layout";
import Login from "../src/pages/Login";
import App from "../src/App";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout><App></App></Layout>,
    },{
        path: '/posts',
        element: <Layout> <Posts></Posts></Layout>,
    },{
        path: '/post/:id',
        element: <Layout> <Post></Post></Layout>,
    },
    {path: '/user/:id', element: <CheckUser><Layout><User></User></Layout></CheckUser>},
    {path: '/login', element: <CheckLogin><Login></Login></CheckLogin>},
    {
        path: "*",
        element: <div>Not Found</div>
    }
])
import Post from '../src/pages/Post'
import User from '../src/pages/User'
import App from "../src/App";
import Login from "../src/pages/Login";
import Layout from "../components/layout/Layout";

import {createBrowserRouter} from "react-router-dom";
import PrivateRoute from "./route_helper/PrivateRoutes";
import CheckLogin from "./route_helper/CheckLogin";
import CheckUser from "./route_helper/CheckUser";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {path: '/', element: <App></App>},
            {path: '/post', element: <Post></Post>},

        ]
    },
    {path: '/user/:id', element: <CheckUser><Layout><User></User></Layout></CheckUser>},
    {path: '/login', element: <CheckLogin><Login></Login></CheckLogin>},
    {
        path: "*",
        element: <div>Not Found</div>
    }
])
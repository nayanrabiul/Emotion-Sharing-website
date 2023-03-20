import Post from '../src/pages/Post'
import User from '../src/pages/User'
import App from "../src/App";
import Login from "../src/pages/Login";
import Layout from "../components/layout/Layout";

import {createBrowserRouter} from "react-router-dom";
import PrivateRoute from "./route_helper/PrivateRoutes";
import UserCheck from "./route_helper/UserCheck";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {path: '/', element: <App></App>},
            {path: '/post', element: <Post></Post>},]
    },
    {
        path: '/login',
        element: <UserCheck><Login></Login></UserCheck>

    },
    {
        path: '/user/:id',
        element: <UserCheck><Layout><User></User></Layout> </UserCheck>

    },

    {
        path: "*",
        element: <div>Not Found</div>
    }
])
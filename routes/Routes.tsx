import Post from '../src/pages/Post'
import User from '../src/pages/User'
import App from "../src/App";
import Login from "../src/pages/Login";
import Layout from "../components/layout/Layout";

import {createBrowserRouter} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {path: '/', element: <App></App>},
            {path: '/post', element: <Post></Post>}
        ]

    },
    {
        path: '/user/:id',
        element: <PrivateRoute> <User></User> </PrivateRoute>

    }, {
        path: '/login',
        element: <Login></Login>

    },

    {
        path: "*",
        element: <div>Not Found</div>
    }
])
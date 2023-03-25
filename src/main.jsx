import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {router} from '../routes/Routes.tsx';
import {RouterProvider} from 'react-router-dom';
import AuthProvider from "../contexts/AuthProvider.jsx";

import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider theme="dark">
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>
);




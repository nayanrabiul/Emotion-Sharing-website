import React, {useContext, useEffect, useState} from "react";
import Footer from "./Footer.jsx";
import Nav from "./Nav.tsx";
import {Col, Row} from "antd";

const Layout = ({children}) => {
    return (

        <div className={'px-4 md:px-12 lg:px-32 '}>
            <Nav/>
            <div className="pb-32">
                {children}
            </div >
            <Footer/>
        </div>)

};

export default Layout;
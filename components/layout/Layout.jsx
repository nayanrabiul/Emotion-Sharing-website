import React, {useContext, useEffect, useState} from "react";
import Footer from "./footer.jsx";
import Nav from "./nav.jsx";
import {Col, Row} from "antd";

const Layout = ({children}) => {
    return (

        <div className={'px-4 md:px-12 lg:px-32 '}>
            <Nav/>
            <div>
                {children}
            </div>
            {/*<Footer/>*/}
        </div>)

};

export default Layout;
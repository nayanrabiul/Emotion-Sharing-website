import React, { useContext, useEffect, useState } from "react";
import Footer from "./footer";
import Nav from "./nav";

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            {children}
            <Footer/>
        </div>
    );
};

export default Layout;
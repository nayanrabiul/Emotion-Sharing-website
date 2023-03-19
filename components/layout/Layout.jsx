import React, { useContext, useEffect, useState } from "react";
import Footer from "./footer.jsx";
import Nav from "./nav.jsx";

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            {children}
            {/*<Footer/>*/}
        </div>
    );
};

export default Layout;


import React, {useCallback, useContext, useEffect, useState} from "react";



import {motion} from "framer-motion"
import {Link} from "react-router-dom";

const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: "-100%"},
}


const variants_mobile_nav_ul = {
    open: {
        transition: {staggerChildren: 0.07, delayChildren: 0.2}
    },
    closed: {
        transition: {staggerChildren: 0.05, staggerDirection: -1}
    }
};
const variants_mobile_nav_li = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 1000}
        }
    }
};


const Nav = () => {

    const [toggle, setToggle] = useState(false);

    return (
        <div
            className={`fixed z-50 w-full bg-red-400  `}
        >

            <nav className="container p-0 flex justify-between items-center">
                {/* for desktop */}
                <div className="w-full py-1 flex justify-between items-center">
                    <Link to={`/`}>root</Link>
                    <Link to={`/post`}>post</Link>
                    <Link to={`/login`}>login</Link>
                    <Link to={`/user/1`}>user</Link>
                </div>

                {/* this is for  toggle  hamburger icon and close*/}
                <div className="md:hidden flex justify-end items-center py-3">
                    <img
                        src={toggle ? "/nav/close.svg" : "/nav/menu.svg"}
                        alt="menu"
                        className="w-7 h-7"
                        height={28}
                        width={28}
                        onClick={() => setToggle(!toggle)}
                    />

                    {/* this is mobile secton */}

                    <motion.nav
                        animate={toggle ? "open" : "closed"} variants={variants}
                        className={` ${
                            !toggle ? "hidden" : "fixed"
                        }   top-0 right-0 left-0  h-screen bg-[#000000]  `}
                    >
                        <div className="flex flex-col justify-center items-center p-4 py-16">
                            <div className="border rounded-full border-white p-4">
                                <img
                                    src={"/nav/close.svg"}
                                    alt="menu"
                                    className="object-contain"
                                    height={28}
                                    width={28}
                                    onClick={() => setToggle(!toggle)}
                                />
                            </div>
                            <motion.ul variants={variants_mobile_nav_ul}
                                       className=" flex flex-col justify-center items-center space-x-3 text-3xl text-second mt-8 space-y-8">
                                <Link to={`/`}>root</Link>
                                <Link to={`/post`}>post</Link>
                                <Link to={`/login`}>login</Link>
                                <Link to={`/user/1`}>user</Link>
                            </motion.ul>

                        </div>
                    </motion.nav>
                </div>
            </nav>
        </div>
    );
};

export default Nav;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Col, Row } from "antd";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import Dropdown from "../common/Dropdown.jsx";
import SearchBox from "../home_page/SearchBox.jsx";
import {Border} from "../common/Border";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);

  //tailwind dark mode confguration
  const [isDarkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav>
      <Row className="pt-5">
        <Col span={3}>
          <Link to={`/`}>
            <img className={"h-11 w-11"} src={"/logo.svg"} alt={"logo"} />
          </Link>
        </Col>
        <Col xs={14} md={17}>
          <div className="w-full">
            <SearchBox />
          </div>
        </Col>
        <Col xs={7} md={4} className="flex ">
          <div className="flex justify-end items-center">
            <DarkModeSwitch
              style={{ marginBottom: "2rem" }}
              moonColor={"blue"}
              sunColor={"orange"}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={24}
            />
          </div>

          {user ? (
            <div className="flex-1">
              <Dropdown user={user} setUser={setUser} />
            </div>
          ) : (
            <div className="flex-1">
              <Link to={`/login`}>
                <Border>
                  <button className="border bg-main dark:text-dark">
                    Login
                  </button>
                </Border>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </nav>
  );
};

export default Nav;

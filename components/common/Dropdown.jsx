import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {Border} from "./Border";
import { AiOutlineUser } from "react-icons/ai";

function Dropdown({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <Border justify={"end"}>
        <button className="border bg-main" onClick={toggleDropdown}>
          <div className="flex justify-center items-center gap-2">
            <AiOutlineUser className="w-6 h-6" fill="#B9E0FF" />
            <p className="dark:text-dark">{user.name.split(" ")[0]}</p>
          </div>
        </button>
      </Border>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-xl z-20 dark:bg-dark dark:shadow dark:shadow-support">
          <div className="p-2 rounded font-semi-bold hover:bg-support hover:text-dark">
            <Link to={`/user/${user}`}>Profile</Link>{" "}
          </div>
          <div
            className="p-2 rounded font-semi-bold hover:bg-support hover:text-dark"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
              return <Navigate to="/"></Navigate>;
            }}
          >
            logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="flex justify-end text-cyan-700">
        <Link to="https://github.com/nayanrabiul">
          <p>Developed by @Nayan</p>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;

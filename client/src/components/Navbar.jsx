import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import NavRight from "./NavRight";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/intro">디지털집현전이 처음이에요</Link>
        <Link to="/about">디지털집현전 소개</Link>
        <Link to="/notice">공지사항</Link>
      </div>
      <div>
        <NavRight />
      </div>
    </nav>
  );
};

export default Navbar;

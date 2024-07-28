import HomeIcon from "@mui/icons-material/Home"; // Home 아이콘 임포트
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import NavRight from "./NavRight";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/intro">디지털집현전이 처음이에요</Link>
        <Link to="/about">디지털집현전 소개</Link>
        <Link to="/notice">공지사항</Link>
        <HomeIcon
          sx={{ fontSize: 40, color: "#646cff", cursor: "pointer" }}
          onClick={handleHomeClick}
        />
      </div>

      <div>
        <NavRight />
      </div>
    </nav>
  );
};

export default Navbar;

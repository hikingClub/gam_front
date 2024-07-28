import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mainLogo.png"; // 이미지 import
import "../styles/MainContent.css";

const MainContent = () => {
  return (
    <div className="main-content-container">
      <div className="text-center">
        {/* 1. 로고 이미지 */}
        <div className="logo-container mb-8">
          <img src={logo} alt="Logo" className="logo" />{" "}
        </div>
        {/* 2,3. 사이트제목 및 부제목(설명)  */}
        <h1 className="title text-4xl font-bold mb-4 text-purple-800">
          디지털 규장각
        </h1>
        <p className="subtitle text-xl text-purple-600 mb-8">
          전 국민 지식 플랫폼
        </p>
        {/* 4. 검색창 */}
        <div className="search-container">
          <Input
            placeholder="궁금한 것을 검색해주세요."
            className="search-input"
            fullWidth
            startAdornment={
              <Link to="/search">
                <SearchIcon className="icon" sx={{ fontSize: "1.4em" }} />
              </Link>
            }
            endAdornment={
              <Link to="/search">
                <MicIcon className="icon" sx={{ fontSize: "1.4em" }} />
              </Link>
            }
            sx={{
              width: "400px",
              height: "50px",
              padding: "10px",
              fontSize: "1.2em",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mainLogo.png";
import "../styles/MainContent.css";

const MainContent = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = e => {
    setSearchKeyword(e.target.value);
  };

  const getSearchLink = () => {
    return `/search?keyword=${encodeURIComponent(searchKeyword)}`;
  };

  return (
    <div className="main-content-container">
      <div className="home-center">
        {/* 1. 로고 이미지 */}
        <div className="logo-container mb-8">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {/* 2,3. 사이트제목 및 부제목(설명)  */}
        <h1 className="home-title">디지털 규장각</h1>
        <p className="home-subtitle">전 국민 지식 플랫폼</p>
        {/* 4. 검색창 */}
        <div>
          <Input
            placeholder="궁금한 것을 검색해주세요."
            className="home-searchInput home-MuiInput-underline"
            fullWidth
            endAdornment={
              <>
                <Link to={getSearchLink()}>
                  <SearchIcon
                    className="home-icon"
                    sx={{ fontSize: "1.45em" }}
                  />
                </Link>
                <Link to="/test">
                  <MicIcon className="home-icon" sx={{ fontSize: "1.45em" }} />
                </Link>
              </>
            }
            sx={{
              width: "400px",
              height: "50px",
              padding: "10px",
              paddingLeft: "15px", // placeholder 위치
              fontSize: "1.2em",
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
            value={searchKeyword} // 입력된 값을 상태와 연결
            onChange={handleInputChange} // 입력 변경 시 상태 업데이트
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

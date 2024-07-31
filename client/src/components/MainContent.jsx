import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, Input, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mainLogo.png";
import "../styles/MainContent.css";

const MainContent = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = e => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchKeyword.trim() === "") {
      setOpenSnackbar(true);
    } else {
      navigate(getSearchLink());
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const getSearchLink = () => {
    return `/search?keyword=${encodeURIComponent(searchKeyword)}`;
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const iconStyle = {
    fontSize: "1.45em",
    cursor: "pointer",
    color: "#3f51b5",
    marginLeft: "5px", // 원하는 간격으로 조정
    "&:hover": {
      color: "#8e24aa",
    },
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
                <SearchIcon
                  sx={{ ...iconStyle, marginBottom: "5px" }}
                  onClick={handleSearchClick}
                />
                <Link to="/test">
                  <MicIcon sx={iconStyle} />
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
            onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
          />
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "center", horizontal: "center" }} // 화면 상단 중앙에 위치
        sx={{ top: "15%" }} // 위치 및 크기 조정
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          검색어를 입력하세요.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainContent;

import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, Button, Input, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mainLogo.png";
import "../styles/MainContent.css";
import { fetchAutocompleteSuggestions } from "../utils/autoComplete"; // 유틸리티 함수 불러오기

const DetailedSearchButton = styled(Button)({
  marginLeft: "8px",
  background: "linear-gradient(135deg, #6EC1E4 0%, #0563AF 100%)", // Adjusted gradient to match the provided description
  color: "white",
  borderRadius: "9999px", // More rounded corners
  padding: "11px 10px",
  textTransform: "none", // Remove uppercase transformation
  boxShadow: "0 3px 5px 2px rgba(0, 105, 217, .3)", // Subtle shadow for depth
  "&:hover": {
    background: "linear-gradient(135deg, #5db0d3 0%, #04588c 100%)", // Darker gradient on hover
  },
  fontSize: "0.875rem", // Smaller text size for better fit
  fontWeight: "bold", // Bold font weight
});

const MainContent = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]); // 자동완성 제안을 저장하는 상태
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = async e => {
    const inputValue = e.target.value;
    setSearchKeyword(inputValue);

    if (inputValue.trim().length > 0) {
      // 자동완성 제안 요청
      const results = await fetchAutocompleteSuggestions(inputValue);
      setSuggestions(results);
    } else {
      setSuggestions([]); // 입력이 없으면 제안 초기화
    }
  };

  const handleSuggestionClick = suggestion => {
    setSearchKeyword(suggestion); // 선택된 제안으로 검색어 설정
    setSuggestions([]); // 제안 목록 초기화
    navigate(`/search?keyword=${encodeURIComponent(suggestion)}`); // 검색 실행
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
          {/* 추천검색 버튼 */}
          <DetailedSearchButton>상세검색</DetailedSearchButton>
          {/* 자동완성 제안 목록 */}
          {suggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <SearchIcon className="search-icon" /> {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // 화면 상단 중앙에 위치
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

import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import NavRight from "./NavRight";

const Navbar = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태 추가
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL에서 검색어 파라미터 읽기
    const query = new URLSearchParams(location.search).get("keyword");
    setSearchKeyword(query || ""); // 검색어가 없는 경우 빈 문자열로 초기화
  }, [location.search]); // location.search가 변경될 때마다 효과 실행

  const handleSearchSubmit = () => {
    if (searchKeyword.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
    }
  };

  const handleInputChange = event => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // 홈버튼
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* 1. left */}
      <div className="navbar-left">
        <Link to="/">디지털규장각이 처음이에요</Link>
        <Link to="/">디지털규장각 소개</Link>
        <Link to="/">공지사항</Link>
        <Link to="/updated">업데이트 내역</Link>
        <HomeIcon
          sx={{ fontSize: 40, color: "#646cff", cursor: "pointer" }}
          onClick={handleHomeClick}
        />
      </div>
      {/* 2. middle(조건부) */}
      {location.pathname.startsWith("/search") && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flex: 1,
            maxWidth: "700px",
            marginLeft: "-100px",
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="새로운 검색어를 입력하세요!"
            value={searchKeyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </IconButton>
                  <IconButton>
                    <MicIcon />
                  </IconButton>
                </>
              ),
            }}
            sx={{
              width: "400px",
              height: "56px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6a11cb", // 테두리 색상 설정
                  borderWidth: "2.3px", // 테두리 두께 설정
                },
                "&:hover fieldset": {
                  borderColor: "#2575fc", // 호버 시
                  borderWidth: "2.3px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6a11cb", // 포커스 시
                  borderWidth: "2.3px",
                },
              },
            }} // 검색바의 너비와 높이를 조정
          />
          <Button
            variant="outlined"
            sx={{
              marginLeft: "-10px",
              height: "56px",
              background:
                "linear-gradient(45deg, rgba(106, 17, 203, 0.7) 30%, rgba(37, 117, 252, 0.7) 90%)",
              borderRadius: 10,
              boxShadow: "0 2.3px 4px 1px rgba(106, 17, 203, .3)",
              color: "white",
              padding: "0 12px",
              "&:hover": {
                background:
                  "linear-gradient(45deg, rgba(106, 17, 203, 0.85) 30%, rgba(37, 117, 252, 0.85) 90%)",
                borderColor: "#646cff",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            추천검색
          </Button>
        </Box>
      )}
      {/* 3. right */}
      <div>
        <NavRight />
      </div>
    </nav>
  );
};

export default Navbar;

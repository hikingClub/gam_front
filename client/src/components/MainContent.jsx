// 1. MainContent.jsx
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, Button, Input, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import logo from "../assets/mainLogo.png";
import "../styles/MainContent.css";
import { fetchAutocompleteSuggestions } from "../utils/autoComplete";
import { uploadImageForSearch } from "../utils/imageSearch"; // 이미지 검색 함수 가져오기
import { fetchRecommendSearch } from "../utils/recommendSearch";
import { useAuth } from "./AuthContext";

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
  const { userData } = useAuth(); // 현재 로그인된 사용자의 데이터
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]); // 자동완성 제안을 저장하는 상태
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isImageSearch, setIsImageSearch] = useState(false); // 이미지 검색 모드 상태
  const navigate = useNavigate();

  // 이미지 검색 기능
  const handleImageSearchToggle = async () => {
    setIsImageSearch(!isImageSearch);
    if (isImageSearch) {
      // 이미지 검색 모드 활성화 시 스낵바를 표시하지 않음
      setOpenSnackbar(false);
    }
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async e => {
      const file = e.target.files[0];
      if (file) {
        try {
          // 이미지 검색 함수 호출
          const result = await uploadImageForSearch(file);
          console.log("이미지 검색 결과:", result); // 결과를 콘솔에 출력
          navigate(`/search`, {
            state: { resultData: result, imageTitle: file.name },
          });
        } catch (error) {
          console.error("Error performing image search:", error);
          setOpenSnackbar(true); // 오류 발생 시 사용자에게 알림
        }
      }
    };
    fileInput.click();
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // 음성인식
  useEffect(() => {
    if (transcript) {
      setSearchKeyword(transcript);

      // 3초 뒤에 검색 이벤트 실행
      const timer = setTimeout(() => {
        handleSearchClick();
      }, 3000);

      // 클린업 함수: 다음 인식이 시작되기 전에 타이머 제거
      return () => clearTimeout(timer);
    }
  }, [transcript]);

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

  const startListening = () => {
    SpeechRecognition.startListening({ language: "ko-KR" });
  };

  const handleMicClick = () => {
    startListening();
  };

  const searchIconStyle = {
    fontSize: "1.45em",
    cursor: "pointer",
    color: "#3f51b5",
    marginLeft: "5px", // 원하는 간격으로 조정
    "&:hover": {
      color: "#8e24aa",
    },
  };

  // 추천검색 결과 가져오기 함수
  const handleFetchRecommendSearch = async () => {
    console.log("사용자 SEQ:", userData.seq);
    const user_id = userData.seq; // 현재 로그인된 사용자의 seq
    const keyword = searchKeyword.trim(); // 사용자가 입력한 검색어

    if (keyword.length === 0) {
      setOpenSnackbar(true); // 검색어가 비어있으면 스낵바 알림을 보여줍니다
      return;
    }

    const result = await fetchRecommendSearch({ user_id, keyword });
    console.log("추천 검색 결과:", result);
    // 추천 검색 결과를 검색 페이지로 네비게이션하면서 state로 데이터 전달
    navigate(
      `/search?keyword=${encodeURIComponent(keyword)}&recommended=true`,
      {
        state: { recommendedData: result },
      }
    );
  };

  const micIconStyle = {
    fontSize: "1.45em",
    cursor: "pointer",
    color: listening ? "red" : "#3f51b5", // 음성 인식 중이면 빨간색, 아니면 기본색
    marginLeft: "5px", // 원하는 간격으로 조정
    "&:hover": {
      color: listening ? "darkred" : "#8e24aa", // 음성 인식 중이면 hover 시 어두운 빨간색, 아니면 보라색
    },
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
                  sx={{ ...searchIconStyle, marginBottom: "5px" }}
                  onClick={handleSearchClick}
                />
                <MicIcon sx={micIconStyle} onClick={handleMicClick} />
                <Button
                  sx={{ minWidth: "auto", p: 0 }}
                  onClick={handleImageSearchToggle}
                >
                  <ImageSearchIcon
                    sx={{ ...iconStyle, mb: "7px", fontSize: "1.75em" }}
                  />
                </Button>
              </>
            }
            sx={{
              width: "400px",
              height: "50px",
              padding: "10px",
              paddingLeft: "15px",
              fontSize: "1.2em",
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
            value={searchKeyword} // 입력된 값을 상태와 연결
            onChange={handleInputChange} // 입력 변경 시 상태 업데이트
            onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
          />
          {/* 추천검색 버튼 */}
          <DetailedSearchButton onClick={handleFetchRecommendSearch}>
            추천검색
          </DetailedSearchButton>
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
        sx={{
          position: "fixed", // 위치 고정
          top: "50%", // 화면의 수직 중앙
          transform: "translate(340%, -50%)", // 정 중앙으로 조정
          width: "auto", // 너비 자동 조정
        }}
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

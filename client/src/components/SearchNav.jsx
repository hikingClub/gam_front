import StarIcon from "@mui/icons-material/Star"; // MUI에서 Star 아이콘 임포트
import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "./AuthContext";

const SearchNav = ({
  searchKeyword,
  resultCount,
  onYearChange,
  onViewChange,
  isRecommended,
  imageTitle,
}) => {
  const [year, setYear] = React.useState("전체");
  const [sort, setSort] = React.useState("정확도순");
  const [view, setView] = React.useState("10개 보기");
  const { userData } = useAuth(); // 현재 로그인된 사용자의 데이터
  console.log("userData!?", userData.uid);
  const customMessage = isRecommended
    ? `${userData.uid}님에게 드리는 맞춤형 추천 `
    : "";

  // css
  const commonBoxStyles = {
    bgcolor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    width: "100%",
  };
  const commonFontStyles = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: "bold",
    fontSize: "1.05rem",
  };
  const rightFontStyles = {
    fontFamily: "'Noto Sans KR', sans-serif",
    marginRight: "20px",
  };

  // view 값 변경 시 SearchPage로 전달
  const handleViewChange = event => {
    setView(event.target.value);
    onViewChange(event.target.value);
  };

  return (
    <Box sx={commonBoxStyles}>
      <Box display="flex" alignItems="center">
        {isRecommended && <StarIcon color="primary" />}
        {imageTitle ? (
          <>
            <Typography
              variant="body2"
              color="primary"
              style={{ ...commonFontStyles, marginRight: "8px" }}
            >
              "{imageTitle}"
            </Typography>
            <Typography
              variant="body2"
              style={{
                marginRight: "8px",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              이미지 검색결과
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              color="primary"
              style={{ ...commonFontStyles, marginRight: "8px" }}
            >
              "{searchKeyword}"
            </Typography>
            {isRecommended ? (
              <>
                <Typography
                  variant="body2"
                  color="secondary" // 추천 텍스트 강조
                  style={{
                    marginRight: "2px",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {userData.uid}님에게 드리는 맞춤형 추천
                </Typography>
              </>
            ) : null}
            <Typography
              variant="body2"
              style={{
                marginRight: "8px",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              검색결과
            </Typography>
          </>
        )}
        <Typography
          variant="body2"
          style={{ ...commonFontStyles, marginRight: "100px" }}
        >
          {resultCount}건
        </Typography>
      </Box>
      {/* 좌측 마진 추가 ml={xx} */}
      <Box display="flex" alignItems="center" ml={70}>
        <Select
          variant="standard"
          value={year}
          onChange={e => {
            setYear(e.target.value);
            onYearChange(e.target.value); // SearchPage로 변경된 값을 알림
          }}
          style={{ ...rightFontStyles }}
        >
          <MenuItem value="전체">전체</MenuItem>
          <MenuItem value="최근 2년">최근 2년</MenuItem>
          <MenuItem value="최근 5년">최근 5년</MenuItem>
          <MenuItem value="최근 10년">최근 10년</MenuItem>
        </Select>
        <Select
          variant="standard"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ ...rightFontStyles }}
        >
          <MenuItem value="정확도순">정확도순</MenuItem>
          <MenuItem value="조회순">조회순</MenuItem>
          <MenuItem value="최신순">최신순</MenuItem>
          <MenuItem value="공감순">공감순</MenuItem>
        </Select>
        <Select
          variant="standard"
          value={view}
          onChange={handleViewChange}
          style={{ ...rightFontStyles }}
        >
          <MenuItem value="10개 보기">10개 보기</MenuItem>
          <MenuItem value="20개 보기">20개 보기</MenuItem>
          <MenuItem value="30개 보기">30개 보기</MenuItem>
          <MenuItem value="40개 보기">40개 보기</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default SearchNav;

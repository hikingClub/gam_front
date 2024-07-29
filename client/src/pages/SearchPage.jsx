import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import SearchNav from "../components/SearchNav";
import "../styles/SearchPage.css";

const SearchPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchResults = [
    {
      title: "기상관측 구조체",
      description:
        "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
      date: "2023-08-29",
      type: "특허",
    },
  ];

  return (
    <>
      {/* 상단1 */}
      <Box style={{ width: "100%", marginTop: "120px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="search categories"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#2196f3", // 파란색 인디케이터
              height: "4px", // 인디케이터의 두께를 5px로 설정
            },
          }}
          style={{ width: "100%" }} // Tabs 컴포넌트를 가로 전체로 확장
        >
          <Tab label={<span className="neon-tab">전체</span>} />
          <Tab label={<span className="neon-tab">고전</span>} />
          <Tab label={<span className="neon-tab">기록물</span>} />
          <Tab label={<span className="neon-tab">논문</span>} />
          <Tab label={<span className="neon-tab">도서</span>} />
          <Tab label={<span className="neon-tab">멀티미디어</span>} />
          <Tab label={<span className="neon-tab">법령</span>} />
          <Tab label={<span className="neon-tab">보고서</span>} />
          <Tab label={<span className="neon-tab">신문/잡지</span>} />
          <Tab label={<span className="neon-tab">용어정보</span>} />
          <Tab label={<span className="neon-tab">인물정보</span>} />
          <Tab label={<span className="neon-tab">특허</span>} />
        </Tabs>
      </Box>
      {/* 상단2 */}
      <Box style={{ width: "100%", marginTop: "100px" }}>
        <SearchNav />
      </Box>
      {searchResults.map((result, index) => (
        <Box key={index} className="search-result">
          <Typography variant="h6" className="result-title">
            {result.title}
          </Typography>
          <Typography variant="body2" className="result-description">
            {result.description}
          </Typography>
          <Typography variant="body2" className="result-date">
            {result.date}
          </Typography>
          <Typography variant="body2" className="result-type">
            {result.type}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default SearchPage;

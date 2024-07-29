import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
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
    <Container maxWidth="lg">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="search categories"
      >
        <Tab label="전체" />
        <Tab label="고전" />
        <Tab label="기록물" />
        <Tab label="논문" />
        <Tab label="도서" />
        <Tab label="멀티미디어" />
        <Tab label="법령" />
        <Tab label="보고서" />
        <Tab label="신문/잡지" />
        <Tab label="용어정보" />
        <Tab label="인물정보" />
        <Tab label="특허" />
      </Tabs>
      <Typography variant="h6" className="result-summary">
        "기상" 검색결과 95,808건
      </Typography>
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
    </Container>
  );
};

export default SearchPage;

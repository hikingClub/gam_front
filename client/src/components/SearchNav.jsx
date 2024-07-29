import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const SearchNav = () => {
  const [year, setYear] = React.useState("최근 2년");
  const [language, setLanguage] = React.useState("모든 언어");
  const [sort, setSort] = React.useState("정확도순");
  const [view, setView] = React.useState("20개 보기");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      bgcolor="#f9f9f9"
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="body2"
          color="primary"
          style={{ marginRight: "8px" }}
        >
          "검색"
        </Typography>
        <Typography variant="body2" style={{ marginRight: "8px" }}>
          검색결과
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          style={{ marginRight: "8px" }}
        >
          13,779건
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Select
          variant="standard"
          value={year}
          onChange={e => setYear(e.target.value)}
          style={{ marginRight: "8px" }}
        >
          <MenuItem value="최근 2년">최근 2년</MenuItem>
          <MenuItem value="최근 5년">최근 5년</MenuItem>
          <MenuItem value="최근 10년">최근 10년</MenuItem>
          <MenuItem value="전체">전체</MenuItem>
        </Select>
        <Select
          variant="standard"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          style={{ marginRight: "8px" }}
        >
          <MenuItem value="모든 언어">모든 언어</MenuItem>
          <MenuItem value="국문">국문</MenuItem>
          <MenuItem value="영어">영어</MenuItem>
        </Select>
        <Select
          variant="standard"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ marginRight: "8px" }}
        >
          <MenuItem value="정확도순">정확도순</MenuItem>
          <MenuItem value="조회순">조회순</MenuItem>
          <MenuItem value="최신순">최신순</MenuItem>
          <MenuItem value="공감순">공감순</MenuItem>
        </Select>
        <Select
          variant="standard"
          value={view}
          onChange={e => setView(e.target.value)}
          style={{ marginRight: "8px" }}
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

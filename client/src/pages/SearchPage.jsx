import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import PostSlider from "../components/PostSlider";
import SearchNav from "../components/SearchNav";
import "../styles/Pagination.css";
import "../styles/SearchPage.css";
import { fetchData } from "../utils/searchAPI"; // fetchData 함수 임포트

import myImage1 from "../assets/tmpSlider1.jpg";
import myImage2 from "../assets/tmpSlider2.jpg";
import myImage3 from "../assets/tmpSlider3.png";
import myImage4 from "../assets/tmpSlider4.png";

const postSliders = [
  {
    title: "기사 - 청주13402",
    image: myImage1,
  },
  {
    title: "한-GCC FTA 제5차 공식 협상",
    image: myImage2,
  },
  {
    title: "2023학년도 새 학기 학교 방역지침",
    image: myImage3,
  },
  {
    title: "데이터로 배우는 통계학",
    image: myImage4,
  },
];

const tabPaths = [
  "전체",
  "고전",
  "기록물",
  "논문",
  "도서",
  "멀티미디어",
  "법령",
  "보고서",
  "신문/잡지",
  "용어정보",
  "인물정보",
  "특허",
];

const SearchPage = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태 추가
  const [error, setError] = useState("");
  const [allResults, setAllResults] = useState([]); // 검색 시 담기는 초기의 모든 posts
  const [filteredResults, setFilteredResults] = useState({}); // 각 탭별로 필터링된 결과를 저장할 객체
  const [results, setResults] = useState([]); // 현재 선택된 탭의 게시글들을 저장할 상태
  const navigate = useNavigate();
  const location = useLocation();
  const postsPerPage = 10;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword");
    const tabParam = params.get("tab");
    const tab = tabParam ? tabParam : "전체";
    if (keyword) {
      setSearchKeyword(keyword); // 검색 키워드 설정
      handleFetchData(keyword); // 전체 데이터를 가져옴
    }
    setValue(tabPaths.indexOf(tab));
  }, [location.search]);

  const handleFetchData = async keyword => {
    try {
      const data = await fetchData(keyword, "10000"); // pagePer일단 100개!
      setAllResults(data.result || []); // 모든 데이터를 저장 - for caching

      // 각 탭별로 데이터를 분류하여 filteredResults 객체에 저장
      const filtered = { 전체: data.result || [] };
      tabPaths.forEach(tab => {
        if (tab !== "전체") {
          filtered[tab] = data.result.filter(post => post.type_name === tab);
        }
      });

      setFilteredResults(filtered); // 필터링된 데이터를 상태에 저장
      setResults(filtered[tabPaths[value]] || []); // 현재 탭의 데이터를 설정
    } catch (error) {
      setError("Error fetching data");
    }
  };

  // 탭 변경 시 저장된 데이터를 필터링
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    const tabPath = tabPaths[newValue];
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", tabPath);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });

    // 선택된 탭에 맞는 데이터를 results 상태에 설정
    setResults(filteredResults[tabPath] || []);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // tmp: 멀티미디어 탭에서만 margin-bottom 적용
  const isMultimediaTab =
    new URLSearchParams(location.search).get("tab") === "멀티미디어";

  const offset = currentPage * postsPerPage;
  const currentPosts = results.slice(offset, offset + postsPerPage); // results에서 현재 페이지의 포스트 추출
  const pageCount = Math.ceil(results.length / postsPerPage); // 전체 페이지 수 계산

  return (
    <div
      className={`tmp-container ${isMultimediaTab ? "multimedia-margin" : ""}`}
    >
      {/* 상단1 */}
      <Box
        style={{
          width: "100%",
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="search categories"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { height: "4px" } }} // 인디케이터의 두께
          style={{ width: "100%" }} // Tabs 컴포넌트를 가로 전체로 확장
        >
          {tabPaths.map((label, index) => (
            <Tab
              key={index}
              label={<span className="neon-tab">{label}</span>}
            />
          ))}
        </Tabs>
      </Box>
      {/* 상단2 */}
      <SearchNav searchKeyword={searchKeyword} resultCount={results.length} />
      {/* 하단 카드 */}
      <Box sx={{ width: "90%" }}>
        <Box mt={4}>
          {value === 5 ? (
            <PostSlider posts={postSliders} />
          ) : (
            currentPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          )}
        </Box>
        {value !== 5 && (
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        )}
      </Box>
    </div>
  );
};

export default SearchPage;

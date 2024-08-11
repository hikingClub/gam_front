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
  const [postsPerPage, setPostsPerPage] = useState(10); // 동적으로 페이지당 게시물 수 설정
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태 추가
  const [error, setError] = useState("");
  const [allResults, setAllResults] = useState([]); // 검색 시 담기는 초기의 모든 posts
  const [filteredResults, setFilteredResults] = useState({}); // 각 탭별로 필터링된 결과를 저장할 객체
  const [results, setResults] = useState([]); // 현재 선택된 탭의 게시글들을 저장할 상태
  const [summaryToggles, setSummaryToggles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword");
    const recommended = params.get("recommended") === "true";
    const tabParam = params.get("tab");
    const tab = tabParam ? tabParam : "전체";

    if (keyword) {
      setSearchKeyword(keyword);

      if (recommended && location.state && location.state.recommendedData) {
        // 전달받은 추천 검색 데이터를 바로 사용
        const data = location.state.recommendedData;
        console.log("추천 검색 데이터 수신:", data);

        setAllResults(data.result || []);
        const filtered = { 전체: data.result || [] };
        tabPaths.forEach(tab => {
          if (tab !== "전체") {
            filtered[tab] = data.result.filter(post => post.type_name === tab);
          }
        });
        setFilteredResults(filtered);
        setResults(filtered[tabPaths[value]] || []);
      } else {
        // 일반 검색 로직
        handleFetchData(keyword);
      }
    } else if (location.state && location.state.resultData) {
      // 이미지 검색 결과를 받은 경우
      const data = location.state.resultData;
      console.log("이미지 검색 데이터 수신:", data);
      console.log("검색페이지에서 이건?", location.state.imageTitle);

      setAllResults(data.result || []);
      const filtered = { 전체: data.result || [] };
      tabPaths.forEach(tab => {
        if (tab !== "전체") {
          filtered[tab] = data.result.filter(post => post.type_name === tab);
        }
      });
      setFilteredResults(filtered);
      setResults(filtered[tabPaths[value]] || []);
    }

    const tabIndex = tabPaths.indexOf(tab);
    setValue(tabIndex);
    console.log("현재 탭:", tab, "인덱스:", tabIndex);
  }, [location.search, location.state]); // location.state도 의존성에 추가

  // 페이지나 검색 결과가 변경될 때 설명 토글 상태를 리셋
  useEffect(() => {
    setSummaryToggles(Array(results.length).fill(false));
  }, [results, currentPage]);

  // 설명 토글 함수를 PostCard에 전달
  const toggleSummary = index => {
    const newToggles = [...summaryToggles];
    newToggles[index] = !newToggles[index];
    setSummaryToggles(newToggles);
  };

  // 페이지나 검색 결과가 변경될 때 설명 토글 상태를 리셋
  useEffect(() => {
    setSummaryToggles(Array(results.length).fill(false));
  }, [results, currentPage]);

  // 설명 토글 함수를 PostCard에 전달
  const toggleSummary = index => {
    const newToggles = [...summaryToggles];
    newToggles[index] = !newToggles[index];
    setSummaryToggles(newToggles);
  };

  const handleFetchData = async keyword => {
    try {
      const data = await fetchData(keyword, "200"); // pagePer일단 100개!
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

  // 정렬1: 날짜 정렬
  const handleYearFilterChange = selectedYear => {
    if (selectedYear === "전체") {
      setResults(allResults); // "전체"가 선택되면 모든 결과show
    } else {
      const numberOfYears = Number(
        selectedYear.replace("최근 ", "").replace("년", "")
      );
      const pastYearDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - numberOfYears)
      );

      const filteredByDate = allResults.filter(post => {
        const postDate = new Date(post.date);
        return postDate >= pastYearDate;
      });

      setResults(filteredByDate);
    }
  };

  // 정렬2: 개수 정렬(10~40개)
  const handleViewChange = newView => {
    const numberPerPage = parseInt(newView);
    if (!isNaN(numberPerPage) && numberPerPage > 0) {
      setPostsPerPage(numberPerPage); // 올바른 숫자가 추출되면 상태 업데이트
    }
  };

  // tmp: 멀티미디어 탭에서만 margin-bottom 적용
  const isMultimediaTab =
    new URLSearchParams(location.search).get("tab") === "멀티미디어";

  const offset = currentPage * postsPerPage;
  console.log("중간체크!", results);
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
      <SearchNav
        searchKeyword={searchKeyword}
        resultCount={results.length}
        onYearChange={handleYearFilterChange} // 콜백함수를 prop으로 전달
        onViewChange={handleViewChange} // SearchNav에 새로운 prop 전달
        isRecommended={location.search.includes("recommended=true")} // 추천검색인 경우, "추천 검색결과"보여주기 위함
        imageTitle={location.state?.imageTitle || ""} // 이미지 제목 전달
      />
      {/* 하단 카드 */}
      <Box sx={{ width: "90%" }}>
        <Box mt={4}>
          {value === 5 ? (
            <PostSlider posts={postSliders} />
          ) : (
            currentPosts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                showSummary={summaryToggles[currentPage * postsPerPage + index]}
                onToggleSummary={() =>
                  toggleSummary(currentPage * postsPerPage + index)
                }
              />
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

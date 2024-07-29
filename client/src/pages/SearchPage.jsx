import { Box, Container, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import PostCard from "../components/PostCard";
import SearchNav from "../components/SearchNav";
import "../styles/Pagination.css";
import "../styles/SearchPage.css";

const postCards = [
  {
    category: "고전",
    type: "인문 > 역사",
    title: "유정승택(柳政丞宅) 기상명문(記上明文)",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "1617년 상전대(上典宅) 기상명문(記上明文)",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "송천필담 v1(松泉筆談 v1) 정첩의 풍모와 기상",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  // 추가 더미 데이터
  {
    category: "고전",
    type: "인문 > 역사",
    title: "유정승택(柳政丞宅) 기상명문(記上明文)",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "1617년 상전대(上典宅) 기상명문(記上明文)",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "송천필담 v1(松泉筆談 v1) 정첩의 풍모와 기상",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "유정승택(柳政丞宅) 기상명문(記上明文)",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "1617년 상전대(上典宅) 기상명문(記上明文)",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "송천필담 v1(松泉筆談 v1) 정첩의 풍모와 기상",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
  {
    category: "고전",
    type: "인문 > 역사",
    title: "송천필담 v1(松泉筆談 v1) 정첩의 풍모와 기상",
    date: "2022-09-26",
    institution: "한국학중앙연구원 장서각",
    description:
      "출원인: 위본스 주식회사, 발명자: 강남호, 대리인: 특허법인해인",
    relatedInfo: "디지털 장서각",
  },
];

const postSliders = [
  {
    title: "DogeGod",
    image:
      "https://i1.sndcdn.com/artworks-8hUNunJfPf7jLpzY-jYmGvg-t500x500.jpg",
  },
  {
    title: "GeneralDoge",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8l2a2lP8gxw1qH1tQRnn4zBmzlYIayHdtOA&s",
  },
  {
    title: "Mayday - 890's victim ",
    image: "https://img.hankyung.com/photo/202106/01.26703829.1.jpg",
  },
  {
    title: "KingDoge",
    image:
      "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/419/4c9f3e41a1f1560f868d97c494db5425_res.jpeg",
  },
];

const SearchPage = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * postsPerPage;
  const currentPosts = postCards.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(postCards.length / postsPerPage);

  return (
    <>
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
      <SearchNav />
      {/* 하단 카드 */}
      <Container maxWidth="md">
        <Box mt={4}>
          {postCards.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Box>
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
      </Container>
    </>
  );
};

export default SearchPage;

{
  /* <Container maxWidth="md">
        <Box mt={4}>
          {postCards.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Box>
      </Container> */
}

{
  /* <Container maxWidth="lg">
        <Box mt={4}>
          <PostSlider posts={postSliders} />
        </Box>
      </Container> */
}

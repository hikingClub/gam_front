import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/Pagination.css"; // CSS 파일 추가

const NeonCardWrapper = styled(Box)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 4px; /* 애니메이션 효과를 위한 패딩 */
`;

const NeonBorder = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  border: 4px solid;
  border-image: linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff) 1;
  animation: neon-border 3s infinite;
  pointer-events: none; /* 클릭 이벤트를 막기 위해 */

  @keyframes neon-border {
    0% {
      border-image: linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff) 1;
    }
    50% {
      border-image: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff) 1;
    }
    100% {
      border-image: linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff) 1;
    }
  }
`;

const NeonCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Arrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const NextArrow = props => {
  const { onClick } = props;
  return (
    <Arrow style={{ right: 10 }} onClick={onClick}>
      <ArrowForwardIosIcon />
    </Arrow>
  );
};

const PrevArrow = props => {
  const { onClick } = props;
  return (
    <Arrow style={{ left: 10 }} onClick={onClick}>
      <ArrowBackIosIcon />
    </Arrow>
  );
};

const PostSlider = ({ posts = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;
  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "80%", overflow: "hidden", px: 1, mx: "auto" }}>
      <Slider {...settings}>
        {currentPosts.map((post, index) => (
          <Box key={index} p={1} mx={1}>
            {" "}
            {/* 카드 간격 조정 */}
            <NeonCardWrapper sx={{ width: "80%" }}>
              {" "}
              {/* 카드 가로 길이 조정 */}
              <NeonBorder />
              <NeonCard>
                <CardMedia
                  component="img"
                  height="180" /* 기존 140에서 180으로 높이를 늘림 */
                  image={post.image}
                  alt={post.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {post.title}
                  </Typography>
                </CardContent>
              </NeonCard>
            </NeonCardWrapper>
          </Box>
        ))}
      </Slider>
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
    </Box>
  );
};

export default PostSlider;

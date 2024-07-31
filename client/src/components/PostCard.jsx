import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const outerPostBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "0.5px", // 카드 사이 간격
  // paddingLeft: "10%",
};

const buttonStyle = {
  backgroundColor: "#f5f5f5", // 회색 톤의 배경색
  border: "none", // 테두리 제거
  color: "#3f51b5",
  fontSize: "0.75rem", // 폰트 크기 조정
  fontWeight: "bold",
  fontFamily: '"Noto Sans KR", sans-serif', // 폰트 설정
  textTransform: "none",
  borderRadius: "7px", // 테두리 반경 조정
  padding: "2px 10px", // 패딩 조정
  "&:hover": {
    backgroundColor: "#e0e0e0", // 호버 시 조금 더 어두운 회색
    color: "#3f51b5",
  },
};

const PostCard = ({ post }) => {
  const {
    type_name,
    map_path,
    company_name,
    title,
    author_affiliation,
    date,
    publisher,
  } = post;

  // 색상을 조건에 따라 설정하는 예시
  const getChipColor = type => {
    switch (type) {
      case "고전":
        return "#f44336"; // 빨간색
      case "기록물":
        return "#e91e63"; // 분홍색
      case "논문":
        return "#9c27b0"; // 보라색
      case "도서":
        return "#673ab7"; // 짙은 보라색
      case "멀티미디어":
        return "#3f51b5"; // 인디고
      case "법령":
        return "#2196f3"; // 파란색
      case "보고서":
        return "#03a9f4"; // 하늘색
      case "신문/잡지":
        return "#00bcd4"; // 청록색
      case "용어정보":
        return "#009688"; // 청록색
      case "인물정보":
        return "#4caf50"; // 초록색
      case "특허":
        return "#8bc34a"; // 연초록색
      default:
        return "#607d8b"; // 기본 회색
    }
  };

  // 텍스트가 축약된 상태인지 전체가 표시된 상태인지 관리
  const [isExpanded, setIsExpanded] = useState(false);

  // 일정 길이 이상의 텍스트를 축약
  const truncatedAuthorAffiliation =
    author_affiliation.length > 30
      ? `${author_affiliation.substring(0, 30)}...`
      : author_affiliation;

  return (
    <Box style={outerPostBox}>
      <Card
        sx={{ width: "40%", mb: 2, p: 2, borderRadius: "8px", boxShadow: 3 }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={type_name}
              sx={{ backgroundColor: getChipColor(type_name), color: "white" }}
            />
            {map_path.map((path, index) => (
              <Chip
                key={index}
                label={path}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
            ))}
            <Chip
              label={company_name}
              sx={{ backgroundColor: "#ff9800", color: "white" }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            {title}
          </Typography>

          <Box display="flex" alignItems="center" sx={{ mt: 0.2 }}>
            <Typography variant="body2" color="textSecondary">
              {isExpanded ? author_affiliation : truncatedAuthorAffiliation}
            </Typography>
            {author_affiliation.length > 30 && (
              <Button
                size="small"
                sx={{ marginLeft: "5px", padding: "0" }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "닫기" : "더보기"}
              </Button>
            )}
            <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }}>
              |
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {date}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }}>
              |
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {publisher}
            </Typography>
          </Box>
          <Box display="flex" gap={1} sx={{ mt: 2 }}>
            <Button variant="outlined" size="small" sx={buttonStyle}>
              설명
            </Button>
            <Button variant="outlined" size="small" sx={buttonStyle}>
              연관지식
            </Button>
            <Button variant="outlined" size="small" sx={buttonStyle}>
              상세 보기
            </Button>
            <Button variant="outlined" size="small" sx={buttonStyle}>
              출처 바로가기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;

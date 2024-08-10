import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const getChipColor = type => {
    switch (type) {
      case "고전":
        return "#f44336";
      case "기록물":
        return "#e91e63";
      case "논문":
        return "#9c27b0";
      case "도서":
        return "#673ab7";
      case "멀티미디어":
        return "#3f51b5";
      case "법령":
        return "#2196f3";
      case "보고서":
        return "#03a9f4";
      case "신문/잡지":
        return "#00bcd4";
      case "용어정보":
        return "#009688";
      case "인물정보":
        return "#4caf50";
      case "특허":
        return "#8bc34a";
      default:
        return "#607d8b";
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedAuthorAffiliation =
    author_affiliation.length > 30
      ? `${author_affiliation.substring(0, 30)}...`
      : author_affiliation;

  const handleDetailClick = () => {
    // '상세 보기' 버튼을 클릭하면 /detail 경로로 이동
    navigate("/detail");
  };

  return (
    <Box
      style={{ display: "flex", justifyContent: "center", marginTop: "0.5px" }}
    >
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
            <Button
              variant="outlined"
              size="small"
              sx={buttonStyle}
              onClick={handleDetailClick} // 상세 보기 버튼 클릭 시 handleDetailClick 함수 호출
            >
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

const buttonStyle = {
  backgroundColor: "#f5f5f5",
  border: "none",
  color: "#3f51b5",
  fontSize: "0.75rem",
  fontWeight: "bold",
  fontFamily: '"Noto Sans KR", sans-serif',
  textTransform: "none",
  borderRadius: "7px",
  padding: "2px 10px",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    color: "#3f51b5",
  },
};

export default PostCard;

import DescriptionIcon from "@mui/icons-material/Description";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import DetailContent from "./DetailContent";
import { IoClose } from "react-icons/io5";
import "../styles/PostCard.css";
import React, { useState } from "react";

const outerPostBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "0.5px",
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

const PostCard = ({ post, showSummary, onToggleSummary }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDetailClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box style={outerPostBox}>
      <Card
        sx={{ width: "40%", mb: 2, p: 2, borderRadius: "8px", boxShadow: 3 }}
      >
        <CardContent>
          {/* 카드 내용 */}
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={post.type_name}
              sx={{
                backgroundColor: getChipColor(post.type_name),
                color: "white",
              }}
            />
            {post.map_path.map((path, index) => (
              <Chip
                key={index}
                label={path}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
            ))}
            <Chip
              label={post.company_name}
              sx={{ backgroundColor: "#ff9800", color: "white" }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            {post.title}
          </Typography>

          <Box display="flex" alignItems="center" sx={{ mt: 0.2 }}>
            <Typography variant="body2" color="textSecondary">
              {post.author_affiliation}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }}>
              |
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.date}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }}>
              |
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.publisher}
            </Typography>
          </Box>
          <Box display="flex" gap={1} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              sx={buttonStyle}
              onClick={onToggleSummary}
            >
              설명
            </Button>
            <Button variant="outlined" size="small" sx={buttonStyle}>
              연관지식
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={buttonStyle}
              onClick={handleDetailClick}
            >
              상세 보기
            </Button>
            <Button
              variant="outlined"
              size="small"
              component="a"
              href={post.url}
              sx={buttonStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              집현전 바로가기
            </Button>
          </Box>
          <Collapse in={showSummary}>
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                backgroundColor:
                  post.summary === "설명 없음" ? "#fff3e0" : "#f9f9f9",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: '"Noto Sans KR", sans-serif',
                  color: post.summary === "설명 없음" ? "#d32f2f" : "inherit",
                  fontWeight: post.summary === "설명 없음" ? "bold" : "600",
                  opacity: post.summary === "설명 없음" ? 1 : 0.9,
                }}
              >
                {post.summary === "설명 없음" ? (
                  <>
                    <InfoIcon sx={{ mr: 1, color: "#d32f2f" }} />
                    <strong>{post.summary}</strong>
                  </>
                ) : (
                  <>
                    <DescriptionIcon sx={{ mr: 1 }} />
                    {post.summary}
                  </>
                )}
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* 모달 컴포넌트 */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth={false} // MUI의 기본 maxWidth 제한을 제거
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "1100px", // 원하는 최대 너비를 여기서 설정
            width: "100%", // 너비를 100%로 설정하여 maxWidth를 고려하지 않음
            padding: "20px", // 내부 패딩 설정
            height: "90%",
          },
        }}
      >
        <DialogTitle className="post-modal-title">
          상세 정보
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            className="post-modal-close-button"
            style={{
              position: "absolute",
              right: "16px",
              top: "16px",
            }}
          >
            <IoClose size={24} />
          </IconButton>
        </DialogTitle>
        <DialogContent className="post-modal-detail-content">
          {/* DetailContent 컴포넌트를 모달에 삽입 */}
          <DetailContent {...post} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PostCard;

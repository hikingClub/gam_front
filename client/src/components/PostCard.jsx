import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import "../styles/PostCard.css";

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

const PostCard = ({ post, showSummary, onToggleSummary }) => {
  const {
    type_name,
    map_path,
    company_name,
    title,
    author_affiliation,
    date,
    publisher,
    url,
    summary,
    summary_alt,
  } = post;

  // 텍스트가 축약된 상태인지 전체가 표시된 상태인지 관리
  const [isExpanded, setIsExpanded] = useState(false);

  // 색상을 조건에 따라 설정하는 예시
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

  const truncatedAuthorAffiliation =
    author_affiliation?.length > 30
      ? `${author_affiliation.substring(0, 30)}...`
      : author_affiliation;

  const summary2 = summary || summary_alt || "설명 없음";

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
            {author_affiliation?.length > 30 && (
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
              component="a" // 버튼을 링크로 사용
              href={url} // post의 url을 href로 설정
              sx={buttonStyle}
              target="_blank" // 새 탭에서 링크 열기
              rel="noopener noreferrer" // 보안과 관련된 속성 추가
            >
              집현전 바로가기
            </Button>
          </Box>
          {/* Collapse 컴포넌트를 사용하여 설명 텍스트를 토글 */}
          <Collapse in={showSummary}>
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                backgroundColor:
                  summary2 === "설명 없음" ? "#fff3e0" : "#f9f9f9",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: '"Noto Sans KR", sans-serif',
                  color: summary2 === "설명 없음" ? "#d32f2f" : "inherit",
                  fontWeight: summary2 === "설명 없음" ? "bold" : "600", // 조정된 폰트 무게
                  opacity: summary2 === "설명 없음" ? 1 : 0.9,
                }}
              >
                {summary2 === "설명 없음" ? (
                  <>
                    <InfoIcon sx={{ mr: 1, color: "#d32f2f" }} />
                    <strong>{summary2}</strong>
                  </>
                ) : (
                  <>
                    <DescriptionIcon sx={{ mr: 1 }} />
                    {summary2}
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
        maxWidth="md"
        fullWidth
        classes={{ paper: "post-modal-content" }}
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
          {/* DetailContent 내용을 이곳에 직접 포함 */}
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            {/* 왼쪽 콘텐츠 박스 */}
            <Box
              sx={{
                borderRadius: "8px",
                padding: "12px", // 내용물에 여백을 줌
                width: "80%", // 너비 조정
                backgroundColor: "#ffffff", // 배경색을 하얀색으로 설정
                fontSize: "0.7rem", // 글자 크기 조정
              }}
            >
              {title && (
                <Typography variant="h6" gutterBottom className="detail-title">
                  {title}
                </Typography>
              )}
              {doc_id && (
                <Typography variant="subtitle1" className="detail-info">
                  <strong>문서 ID:</strong> {doc_id}
                </Typography>
              )}
              {date && (
                <Typography variant="subtitle2" className="detail-info">
                  <strong>작성일:</strong> {date}
                </Typography>
              )}
              {summary && (
                <Typography variant="body1" className="detail-info">
                  <strong>요약:</strong> {summary}
                </Typography>
              )}
              {type_name && (
                <Typography variant="body1" className="detail-info">
                  <strong>타입 이름:</strong> {type_name}
                </Typography>
              )}
              {map_path.length > 0 && (
                <Typography variant="body1" className="detail-info">
                  <strong>맵 경로:</strong> {map_path.join(", ")}
                </Typography>
              )}
              {author_affiliation && (
                <Typography variant="body1" className="detail-info">
                  <strong>저자 소속:</strong> {author_affiliation}
                </Typography>
              )}
              {toc && (
                <Typography variant="body1" className="detail-info">
                  <strong>목차:</strong> {toc}
                </Typography>
              )}
              {summary_alt && (
                <Typography variant="body1" className="detail-info">
                  <strong>요약 대체:</strong> {summary_alt}
                </Typography>
              )}
              {abst && (
                <Typography variant="body1" className="detail-info">
                  <strong>초록:</strong> {abst}
                </Typography>
              )}
              {orgn_code && (
                <Typography variant="body1" className="detail-info">
                  <strong>기관 코드:</strong> {orgn_code}
                </Typography>
              )}
              {title_alt && (
                <Typography variant="body1" className="detail-info">
                  <strong>대체 제목:</strong> {title_alt}
                </Typography>
              )}
              {orgn_name && (
                <Typography variant="body1" className="detail-info">
                  <strong>기관 이름:</strong> {orgn_name}
                </Typography>
              )}
              {company_name && (
                <Typography variant="body1" className="detail-info">
                  <strong>회사 이름:</strong> {company_name}
                </Typography>
              )}
              {publisher && (
                <Typography variant="body1" className="detail-info">
                  <strong>출판사:</strong> {publisher}
                </Typography>
              )}
              {abst_alt && (
                <Typography variant="body1" className="detail-info">
                  <strong>초록 대체:</strong> {abst_alt}
                </Typography>
              )}
              {toc_alt && (
                <Typography variant="body1" className="detail-info">
                  <strong>목차 대체:</strong> {toc_alt}
                </Typography>
              )}
              {url && (
                <Typography variant="body1" className="detail-info">
                  <strong>URL:</strong>{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </Typography>
              )}
            </Box>

            {/* 오른쪽 박스 */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              sx={{
                borderRadius: "8px",
                padding: "16px", // 오른쪽 콘텐츠 박스에 패딩 추가
                width: "15%", // 너비 조정
                marginTop: "80px", // 상단 여백 추가
              }}
            >
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  backgroundColor: "#f5f5f5",
                  minWidth: "80px",
                  textAlign: "center",
                  marginBottom: "8px", // 각 항목 사이의 간격
                }}
              >
                <Typography variant="body1" className="detail-info">
                  공감: {empathy != null ? empathy : 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  backgroundColor: "#f5f5f5",
                  minWidth: "80px",
                  textAlign: "center",
                  marginBottom: "8px", // 각 항목 사이의 간격
                }}
              >
                <Typography variant="body1" className="detail-info">
                  조회수: {views != null ? views : 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  backgroundColor: "#f5f5f5",
                  minWidth: "80px",
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" className="detail-info">
                  방문수: {totalCount != null ? totalCount : 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PostCard;

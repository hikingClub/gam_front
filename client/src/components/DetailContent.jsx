import React from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "../styles/DetailContent.css"; // CSS 파일을 import
import { FiShare2 } from "react-icons/fi";
import { TfiFaceSmile } from "react-icons/tfi";
import { AiOutlineEye } from "react-icons/ai"; // 눈 모양 아이콘 추가
import testGraphic from "../assets/test_graphic.png"; // 이미지 임포트
// import { useAuth } from "./AuthContext";

const DetailContent = ({
  title,
  date,
  type_name,
  map_path,
  author_affiliation,
  toc,
  summary_alt,
  orgn_name,
  publisher,
  abst_alt,
  toc_alt,
  url,
  summary,
  abst,
  empathy,
  views,
}) => {
  //   // 각 버튼의 클릭 핸들러 함수 정의
  //   useEffect(() => {
  //     // 세션에서 사용자 seq를 가져오는 API 요청
  //     const fetchUserSeq = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:8080/session/getSeq"
  //         );
  //         setUserSeq(response.data.seq); // 세션에서 가져온 사용자 seq를 상태에 저장
  //       } catch (error) {
  //         console.error("사용자 seq 가져오기 에러:", error);
  //       }
  //     };

  //     fetchUserSeq();
  //   }, []);

  //   const handleEmpathyClick = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8080/detail/setEmpathy`,
  //         {
  //           seq: ; // 사용자의 memberSeq 전달
  //         }
  //       );
  //       console.log(response.data);
  //       alert("공감이 성공적으로 추가되었습니다!");
  //     } catch (error) {
  //       console.error("공감 추가 중 에러 발생:", error);
  //       alert("공감 추가 중 에러가 발생했습니다.");
  //     }
  //   };

  const handleViewsClick = () => {
    console.log("조회 버튼 클릭됨");
  };

  const handleShareClick = () => {
    console.log("공유 버튼 클릭됨");
  };

  return (
    <Box className="detail-content-main-container">
      {title && <h6 className="detail-title">{title}</h6>}
      <Box className="detail-content-container">
        <Box className="detail-content-info-box">
          {date && (
            <p className="detail-info detail-info-truncate">
              <strong>날짜 :</strong> {date}
            </p>
          )}
          {type_name && (
            <p className="detail-info detail-info-truncate">
              <strong>자료 분류:</strong> {type_name}
            </p>
          )}
          {map_path.length > 0 && (
            <p className="detail-info detail-info-truncate">
              <strong>분류:</strong> {map_path.join(", ")}
            </p>
          )}
          {author_affiliation && (
            <p className="detail-info detail-info-truncate">
              <strong>저자 :</strong> {author_affiliation}
            </p>
          )}
          {toc && (
            <p className="detail-info detail-info-truncate">
              <strong>목차:</strong> {toc}
            </p>
          )}
          {summary_alt && (
            <p className="detail-info detail-info-truncate">
              <strong>요약 대체:</strong> {summary_alt}
            </p>
          )}
          {orgn_name && (
            <p className="detail-info detail-info-truncate">
              <strong>출처 :</strong> {orgn_name}
            </p>
          )}
          {publisher && (
            <p className="detail-info detail-info-truncate">
              <strong>발행 기관 :</strong> {publisher}
            </p>
          )}
          {abst_alt && (
            <p className="detail-info detail-info-truncate">
              <strong>초록 대체:</strong> {abst_alt}
            </p>
          )}
          {toc_alt && (
            <p className="detail-info detail-info-truncate">
              <strong>목차 대체:</strong> {toc_alt}
            </p>
          )}
          {url && (
            <p className="detail-info detail-info-truncate">
              <strong>URL:</strong>{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </p>
          )}
          {summary && (
            <p className="detail-info detail-info-truncate">
              <strong>요약:</strong> {summary}
            </p>
          )}
          {abst && (
            <p className="detail-info detail-info-truncate">
              <strong>설명 :</strong> {abst}
            </p>
          )}
          <br />
          <Box className="related-info-main-box">
            <Box className="related-info-box">
              <Box className="related-section">
                <h4 className="related-title">연관 주제어</h4>
                <ul className="related-list">
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      생존해성
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      데이터
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      예측
                    </a>
                  </li>
                </ul>
              </Box>
              <Box className="related-section">
                <h4 className="related-title">연관 저자</h4>
                <ul className="related-list">
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      박새란
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      김덕열
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      서강복
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      이유진
                    </a>
                  </li>
                </ul>
              </Box>
              <Box className="related-section">
                <h4 className="related-title">관련 기관</h4>
                <ul className="related-list">
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      정보처리학회논문지 소프트웨어정보통신
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      한국학술정보
                    </a>
                  </li>
                </ul>
              </Box>
              <Box className="related-section">
                <h4 className="related-title">유사 지식</h4>
                <ul className="related-list">
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      정보처리학회논문지 소프트웨어정보통신
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      교차 프로젝트 결합 예측
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      데이터 불균형과 측정 오차를 고려한 모델 개발
                    </a>
                  </li>
                </ul>
              </Box>
            </Box>
            <Box className="related-info-box">
              <Box className="image-related-section">
                <h4 className="image-related-title">연관 지식</h4>
                <ul className="image-related-list">
                  <img
                    src={testGraphic}
                    alt="정보처리학회논문지 소프트웨어정보통신"
                    className="related-list-image"
                  />
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="detail-content-right-box">
          <Button
            className="detail-content-right-item"
            onClick={handleViewsClick}
            variant="outlined"
            startIcon={<AiOutlineEye />}
          >
            조회 {views != null ? views : 0}
          </Button>
          <Button
            className="detail-content-right-item"
            // onClick={handleEmpathyClick}
            variant="outlined"
            startIcon={<TfiFaceSmile />}
          >
            공감 {empathy != null ? empathy : 0}
          </Button>
          <Button
            className="detail-content-right-item"
            onClick={handleShareClick}
            variant="outlined"
            startIcon={<FiShare2 />}
          >
            공유
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailContent;

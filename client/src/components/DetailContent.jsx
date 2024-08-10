import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, Chip } from "@mui/material";
import "../styles/DetailContent.css";

const DetailContent = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL 파라미터에서 데이터 추출
  const params = new URLSearchParams(location.search);
  const title = params.get("title");
  let date = params.get("date");
  const docId = params.get("docId");

  // 날짜 형식에 따른 변환 처리
  if (date) {
    if (date.length === 10) {
      // 'YYYY-MM-DD' 형식인 경우
      date = date.replace(/-/g, ""); // 'YYYYMMDD' 형식으로 변환
    } else if (date.length === 7) {
      // 'YYYY-MM' 형식인 경우
      date = date.replace(/-/g, ""); // 'YYYYMM' 형식으로 변환
    } else if (date.length === 4) {
      // 'YYYY' 형식인 경우
      // 이미 'YYYY' 형식이므로 추가 변환 필요 없음
    } else {
      console.error("Invalid date format"); // 형식이 맞지 않는 경우 로그에 오류 표시
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/detail?title=${encodeURIComponent(title)}&date=${date}&docId=${docId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch detail data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title, date, docId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!data) {
    return <Typography>No data available</Typography>;
  }

  return (
    <div className="detail-content-main-container">
      <div className="detail-content-inner-container">
        <div className="detail-content-wrapper">
          <div className="detail-content-header">
            <Typography variant="h4" className="detail-content-title">
              {data.title}
            </Typography>
            <Typography variant="body1" className="detail-content-date">
              {data.date}
            </Typography>
          </div>
          <div className="detail-content-info">
            <Typography variant="body2" className="detail-content-company-name">
              {data.company_name}
            </Typography>
            <Typography variant="body2" className="detail-content-summary">
              {data.summary}
            </Typography>
            <Typography
              variant="body2"
              className="detail-content-author-affiliation"
            >
              {data.author_affiliation}
            </Typography>
            <Typography variant="body2" className="detail-content-publisher">
              {data.publisher}
            </Typography>
            <Typography variant="body2" className="detail-content-org-code">
              기관 코드: {data.orgn_code}
            </Typography>
            <Typography variant="body2" className="detail-content-org-name">
              기관 이름: {data.orgn_name}
            </Typography>
            <Typography variant="body2" className="detail-content-doc-id">
              문서 ID: {data.doc_id}
            </Typography>
            <Typography variant="body2" className="detail-content-type-name">
              타입 이름: {data.type_name}
            </Typography>
            <Typography variant="body2" className="detail-content-url">
              출처:{" "}
              <a href={data.url} target="_blank" rel="noopener noreferrer">
                {data.url}
              </a>
            </Typography>
          </div>
          <div className="detail-content-actions">
            <Button variant="contained" color="primary">
              공감
            </Button>
            <Button variant="outlined" color="primary">
              즐겨찾기
            </Button>
            <Button variant="outlined" color="primary">
              공유하기
            </Button>
            <Button variant="contained" color="secondary">
              오류 신고
            </Button>
          </div>
          <div className="detail-content-tags">
            <Typography variant="body2">주제어:</Typography>
            {data.map_path &&
              data.map_path.map((tag, index) => (
                <Chip key={index} label={tag} className="detail-content-tag" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContent;

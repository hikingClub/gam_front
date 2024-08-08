import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MySubscription.css";

const MySubscription = () => {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [inputMessage, setInputMessage] = useState(""); // 메시지 상태 추가
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title:
        "Vercochaete carnosus strain and application thereof in erythrocin pollution remediation/treatment",
      time: "11시간 전",
    },
    {
      id: 2,
      title:
        "Heart fibroblast hCF-N1 derived from iPSC (induced pluripotent stem cell) and application thereof",
      time: "11시간 전",
    },
  ]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.get("http://localhost:8080/mypage/0000");
        setKeywords(response.data.keywords);
      } catch (error) {
        console.error("키워드 가져오기 실패:", error);
      }
    };
    fetchKeywords();
  }, []);

  const handleAddKeyword = async e => {
    if (e.key === "Enter" && newKeyword.trim() !== "" && keywords.length < 5) {
      try {
        const response = await axios.post(
          "http://localhost:8080/mypage/addInterestKeywords",
          { keywords: [...keywords, newKeyword.trim()] },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setKeywords([...keywords, newKeyword.trim()]);
          setNewKeyword("");
          setInputMessage(response.data);
          console.log("키워드 추가 성공:", newKeyword.trim());
        }
      } catch (error) {
        console.error("키워드 추가 실패:", error);
        setInputMessage("관심 키워드 추가 실패: " + error.message);
      }
    }
  };

  const handleRemoveKeyword = async keyword => {
    try {
      const updatedKeywords = keywords.filter(k => k !== keyword);
      const response = await axios.post(
        "http://localhost:8080/mypage/removeInterestKeywords",
        { keywords: updatedKeywords },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setKeywords(updatedKeywords);
        setInputMessage(response.data);
        console.log("키워드 삭제 성공:", keyword);
      }
    } catch (error) {
      console.error("키워드 삭제 실패:", error);
      setInputMessage("관심 키워드 삭제 실패: " + error.message);
    }
  };

  const handleKeywordChange = e => {
    setNewKeyword(e.target.value);
  };

  return (
    <div className="subscription-main-container">
      <div className="subscription-inner-container">
        <div className="subs-section subs-keyword-section">
          <h2>구독설정</h2>
          <label>관심키워드 (최대 5개까지 선택 가능합니다)</label>
          <input
            type="text"
            className="keyword-box"
            value={newKeyword}
            onChange={handleKeywordChange}
            onKeyDown={handleAddKeyword}
            placeholder="관심키워드 입력 후 엔터 키를 눌러주세요. (최대 10자 이내)"
            maxLength={10}
          />
          {inputMessage && (
            <p style={{ fontSize: "16px", color: "blue", marginTop: "10px" }}>
              back message : {inputMessage}
            </p>
          )}
          <div className="subs-keyword-list">
            {keywords.map(keyword => (
              <span key={keyword} className="subs-keyword">
                {keyword}{" "}
                <button onClick={() => handleRemoveKeyword(keyword)}>X</button>
              </span>
            ))}
          </div>
        </div>
        <div className="subs-section subs-alerts-section">
          <h3>구독 알림</h3>
          <ul className="alerts-list">
            {alerts.map(alert => (
              <li key={alert.id} className="alert-item">
                <div className="alert-title">{alert.title}</div>
                <div className="alert-time">{alert.time}</div>
                <button className="alert-close">x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MySubscription;

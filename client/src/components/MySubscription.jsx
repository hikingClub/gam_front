import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MySubscription.css";

const MySubscription = () => {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [inputMessage, setInputMessage] = useState(""); // 메시지 상태 추가

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        // 기존에 키워드 가져오는 엔드포인트가 없는거 같음
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
          setInputMessage(response.data); // 백엔드에서 받은 메시지를 사용
          console.log("키워드 추가 성공:", newKeyword.trim()); // 성공 메시지 콘솔 출력
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
        setInputMessage(response.data); // 백엔드에서 받은 메시지를 사용
        console.log("키워드 삭제 성공:", keyword); // 삭제 성공 메시지 콘솔 출력
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
            <p className="input-message">{inputMessage}</p> // 메시지 표시
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
          {/* 기존 구독 알림 UI */}
          <div className="no-alerts">
            <div>새로운 구독 알림이 없습니다.</div>
            <div>알림을 기다려주세요.</div>
            <div>여기서 구독 설정을 관리할 수 있습니다.</div>
            <div>관심 있는 주제를 추가해보세요.</div>
            <div>알림이 있을 때 이곳에 표시됩니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySubscription;

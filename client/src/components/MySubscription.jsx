import React, { useState } from "react";
import "../styles/MySubscription.css";

const MySubscription = () => {
  const [keywords, setKeywords] = useState(["CNN", "컴퓨터"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [alerts, setAlerts] = useState([]);

  const handleAddKeyword = e => {
    if (e.key === "Enter" && newKeyword.trim() !== "" && keywords.length < 5) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = keyword => {
    setKeywords(keywords.filter(k => k !== keyword));
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
            value={newKeyword}
            onChange={handleKeywordChange}
            onKeyDown={handleAddKeyword}
            placeholder="관심키워드 입력 후 엔터 키를 눌러주세요. (최대 10자 이내)"
            maxLength={10}
          />
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
          {alerts.length === 0 ? (
            <p>[구독알림]이 없습니다.</p>
          ) : (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySubscription;

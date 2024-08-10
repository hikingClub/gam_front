import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../styles/MySubscription.css";

const MySubscription = () => {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [alerts, setAlerts] = useState([]); // 알림 데이터 초기값을 빈 배열로 설정

  const { isLoggedIn, userData } = useAuth(); // AuthContext에서 로그인 상태와 사용자 데이터 가져오기

  // 관심 키워드를 가져오는 함수
  useEffect(() => {
    const fetchKeywords = async () => {
      if (!userData || !isLoggedIn) {
        console.error("로그인된 사용자 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/mypage/members/${userData.seq}/interestKeywords`,
          { withCredentials: true }
        );
        setKeywords(response.data);
      } catch (error) {
        console.error("키워드 가져오기 실패:", error);
      }
    };

    if (isLoggedIn && userData) {
      fetchKeywords(); // 로그인 상태이며 사용자 데이터가 존재할 때만 실행
    }
  }, [isLoggedIn, userData]);

  // 구독 알림 데이터를 가져오는 함수
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userData || !isLoggedIn) {
        console.error("로그인된 사용자 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/notifications/all`, // 백엔드 엔드포인트로 요청
          {
            withCredentials: true, // 세션 쿠키를 포함해 요청
            headers: {
              "X-User-ID": userData.uid, // 사용자 ID
              "X-User-Seq": Number(userData.seq), // 사용자 시퀀스 번호
            },
          }
        );

        const formattedAlerts = response.data.map(alert => ({
          id: alert.id,
          title: alert.message, // Notification 엔티티의 message 필드 사용
          time: new Date(alert.modifiedDate).toLocaleString("ko-KR"), // 날짜 형식 변환
        }));

        setAlerts(formattedAlerts); // 응답 데이터로 알림 설정
      } catch (error) {
        console.error("알림 데이터 가져오기 실패:", error);
        if (error.response && error.response.status === 403) {
          console.error("접근 권한이 없습니다.");
        }
      }
    };

    if (isLoggedIn && userData) {
      fetchNotifications(); // 로그인 상태이며 사용자 데이터가 존재할 때만 실행
    }
  }, [isLoggedIn, userData]);

  // 새로운 키워드를 추가하는 함수
  const handleAddKeyword = async e => {
    if (e.key === "Enter" && newKeyword.trim() !== "") {
      if (keywords.length >= 5) {
        setInputMessage("최대 5개의 키워드만 추가할 수 있습니다.");
        return;
      }

      if (keywords.includes(newKeyword.trim())) {
        setInputMessage("중복된 키워드는 추가할 수 없습니다.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/mypage/addInterestKeywords",
          { keywords: [...keywords, newKeyword.trim()] },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setKeywords([...keywords, newKeyword.trim()]);
          setNewKeyword("");
          setInputMessage("키워드가 추가되었습니다.");
          console.log("키워드 추가 성공:", newKeyword.trim());
        }
      } catch (error) {
        console.error("키워드 추가 실패:", error);
        setInputMessage("관심 키워드 추가 실패: " + error.message);
      }
    }
  };

  // 키워드를 삭제하는 함수
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
        setInputMessage("키워드가 삭제되었습니다.");
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
          <h2>구독 설정</h2>
          <label>관심 키워드 (최대 5개까지 선택 가능합니다)</label>
          <input
            type="text"
            className="keyword-box"
            value={newKeyword}
            onChange={handleKeywordChange}
            onKeyDown={handleAddKeyword}
            placeholder="관심 키워드 입력 후 엔터 키를 눌러주세요. (최대 10자 이내)"
            maxLength={10}
          />
          {inputMessage && (
            <p style={{ fontSize: "16px", color: "blue", marginTop: "10px" }}>
              ✅ {inputMessage}
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

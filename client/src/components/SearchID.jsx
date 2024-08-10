import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchID.css";

const SearchID = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState(""); // 닉네임 입력을 위한 상태
  const [errorMessage, setErrorMessage] = useState("");
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState(""); // 화면에 표시할 메시지 상태

  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 modernlogin 화면으로 이동
    navigate("/modernlogin");
  };

  const handleNextClick = async () => {
    try {
      // 이메일 중복 체크 요청
      const checkEmailResponse = await axios.get(
        "http://localhost:8080/member/checkEmail",
        {
          params: { email },
        }
      );

      if (checkEmailResponse.data) {
        // 이메일 중복이 있는 경우
        setMessage("짜잔");
      } else {
        setErrorMessage("가입한 회원이 아니거나, 소셜로그인 회원입니다.");
        setUid(""); // UID 초기화
        setMessage(""); // 메시지 초기화
      }
    } catch (error) {
      console.error("오류 발생:", error);
      setErrorMessage("서버 요청 중 오류가 발생했습니다.");
      setUid(""); // UID 초기화
      setMessage(""); // 메시지 초기화
    }
  };

  return (
    <div className="id-container-main">
      <div className="id-inner-container-main">
        <div className="id-container">
          <div className="id-container-back"></div>
          <div className="id-title">
            <div
              className="id-title-id"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <a href="/search-id">
                <strong>아이디 찾기</strong>
              </a>
            </div>
            <div className={`id-title-pw ${hovered ? "hover" : ""}`}>
              <a href="/search-pw">비밀번호 찾기</a>
            </div>
          </div>
          <div className="id-input-boxes">
            <div className="id-nickname-box">
              닉네임<span className="required">*</span>
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                className="id-input-field"
                value={nickname}
                onChange={e => setNickname(e.target.value)} // 닉네임 입력 처리
              />
            </div>
            <div className="id-email-box">
              이메일<span className="id-required">*</span>
              <input
                type="text"
                placeholder="이메일을 입력하세요."
                className="id-input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          {message && <p className="search-id-success-message">{message}</p>}
          {uid && <p className="search-id-success-message">아이디: {uid}</p>}
          {errorMessage && (
            <p className="search-id-error-message">{errorMessage}</p>
          )}
          <div className="id-btns">
            <div className="id-next-btn">
              <button className="id-next-button" onClick={handleNextClick}>
                다음
              </button>
            </div>
            <div className="id-login-btn">
              <button className="id-login-button" onClick={handleLoginClick}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchID;

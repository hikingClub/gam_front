import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchPW.css";

const SearchPW = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="pw-container-main">
      <div className="pw-container">
        <div className="pw-container-back"></div>
        <div className="pw-title">
          <div
            className="pw-title-id"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <a href="/search-id">아이디 찾기</a>
            <hr />
          </div>
          <div className={`pw-title-pw ${hovered ? "hover" : ""}`}>
            <a href="/search-pw">
              <strong>비밀번호 찾기</strong>
            </a>
            <hr />
          </div>
        </div>
        <div className="pw-input-boxes">
          <div className="pw-nickname-box">
            아이디<span className="pw-required">*</span>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              className="pw-input-field"
            />
          </div>
          <div className="pw-email-box">
            이메일<span className="pw-required">*</span>
            <input
              type="text"
              placeholder="이메일을 입력하세요."
              className="pw-input-field"
            />
          </div>
        </div>
        <div className="pw-btns">
          <div className="pw-next-btn">
            <button className="pw-next-button">다음</button>
          </div>
          <div className="pw-login-btn">
            <button className="pw-login-button" onClick={handleLoginClick}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPW;

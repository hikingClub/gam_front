import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchID.css";

const SearchID = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 로그인 화면으로 이동
    navigate("/login");
  };

  return (
    <div className="id-container-main">
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
            <hr />
          </div>
          <div className={`id-title-pw ${hovered ? "hover" : ""}`}>
            <a href="/search-pw">비밀번호 찾기</a>
            <hr />
          </div>
        </div>
        <div className="id-input-boxes">
          <div className="id-nickname-box">
            닉네임<span className="required">*</span>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              className="id-input-field"
            />
          </div>
          <div className="id-email-box">
            이메일<span className="id-required">*</span>
            <input
              type="text"
              placeholder="이메일을 입력하세요."
              className="id-input-field"
            />
          </div>
        </div>
        <div className="id-btns">
          <div className="id-next-btn">
            <button className="id-next-button">다음</button>
          </div>
          <div className="id-login-btn">
            <button className="id-login-button" onClick={handleLoginClick}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchID;

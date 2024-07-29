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
    <div className="search-container">
      <div className="title">
        <div
          className="title-id"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <a href="/search-id">아이디 찾기!</a>
          <hr />
        </div>
        <div className={`title-pw ${hovered ? "hover" : ""}`}>
          <a href="/search-pw">비밀번호 찾기!</a>
          <hr />
        </div>
      </div>
      <div className="boxes">
        <div className="nickname-box">
          닉네임<span className="required">*</span>
          <input
            type="text"
            placeholder="닉네임을 입력하세요."
            className="input-field"
          />
        </div>
        <div className="email-box">
          이메일<span className="required">*</span>
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            className="input-field"
          />
        </div>
      </div>
      <div className="btns">
        <div className="next-btn">
          <button className="next-button">다음</button>
        </div>
        <div className="login-btn">
          <button className="login-button" onClick={handleLoginClick}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchID;

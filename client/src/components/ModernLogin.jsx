import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google.png";
import kakaoLogo from "../assets/kakao.png";
import naverLogo from "../assets/naver.png";
import { loginHandler } from "../components/LoginHandler";
import "../styles/ModernLogin.css";

const ModernLogin = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="log-container-back">
      <div className="inner-container">
        <div
          className="login-section"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="heading-xl">SNS 로그인</h2>
          <p className="sns-text">
            SNS 계정으로 디지털 규장각 이용이 가능합니다.
          </p>
          <div className="social-login">
            <div
              className="sns-icon"
              onClick={() =>
                loginHandler("kakao", {
                  redirectUri: "http://localhost:5173/auto/kakao/callback",
                })
              }
            >
              <img src={kakaoLogo} alt="Kakao Login" className="kakao-logo" />
            </div>
            <div
              className="sns-icon"
              onClick={() =>
                loginHandler("naver", {
                  redirectUri: "http://localhost:5173/auto/naver/callback",
                })
              }
            >
              <img src={naverLogo} alt="Naver Login" className="naver-logo" />
            </div>
            <div
              className="sns-icon"
              onClick={() =>
                loginHandler("google", {
                  redirectUri: "http://localhost:5173/auto/google/callback",
                })
              }
            >
              <img
                src={googleLogo}
                alt="Google Login"
                className="google-logo"
              />
            </div>
          </div>
          <a href="/signuptos?type=sns" className="signup-link">
            SNS 계정으로 회원가입하기
          </a>
        </div>
        <div className={`welcome-section ${isHovered ? "hovered" : ""}`}>
          <h2 className="heading-xl welcome-text">일반 로그인</h2>
          <h2 className="heading-xl hover-text">SNS LOGIN</h2>
          <div className="ilban-inputbox">
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              className="input-fieldbox"
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              className="input-fieldbox"
            />
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">아이디저장</label>
          </div>
          <button className="sign-in-btn" onClick={handleLoginClick}>
            로그인
          </button>
          <div className="links">
            <a href="/search-id">아이디 찾기 </a>|{" "}
            <a href="/search-pw">비밀번호 찾기 </a>|{" "}
            <a href="/signuptos?type=general">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLogin;

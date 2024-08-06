import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google.png";
import kakaoLogo from "../assets/kakao.png";
import naverLogo from "../assets/naver.png";
import axios from "axios";
import { loginHandler } from "../components/LoginHandler";
import "../styles/ModernLogin.css";

const ModernLogin = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [credentials, setCredentials] = useState({
    uid: "",
    password: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post("http://localhost:8080/member/login", {
        uid: credentials.uid,
        password: credentials.password,
      });

      if (response.status === 200) {
        const responseData = response.data; // 백엔드에서 온 응답 데이터
        console.log("Response Data:", responseData);

        // 응답 문자열에서 SEQ 값을 추출하기 위한 정규식
        const seqMatch = responseData.match(/SEQ: (\d+)/);

        if (seqMatch && seqMatch[1]) {
          const seq = seqMatch[1];
          sessionStorage.setItem("loggedInUserSeq", seq); // 수정된 부분
          alert("로그인 성공! SEQ: " + seq);
          navigate("/");
        } else {
          alert("로그인 성공! 그러나 SEQ 값을 찾을 수 없습니다.");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("로그인 실패\n\n" + error.response.data);
      } else {
        console.error("로그인 요청 에러:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="log-container-back">
      <div className="log-inner-container">
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
                  // https://cdn.kyujanggak.com/auto/kakao/callback
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
              name="uid"
              value={credentials.uid}
              onChange={handleInputChange}
              className="input-fieldbox"
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="input-fieldbox"
            />
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">아이디 저장</label>
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

import React from "react";
import kakaoLogo from "../assets/kakao.png"; // 카카오 로고 이미지 경로
import naverLogo from "../assets/naver.png"; // 네이버 로고 이미지 경로
import googleLogo from "../assets/google.png"; // 구글 로고 이미지 경로
import { loginHandler } from "../components/LoginHandler"; // loginHandler 불러오기
import "../styles/SignupSns.css";

const SignupSns = () => (
  <div className="sns-signup-container">
    <h2 className="sns-signup-title">SNS 계정으로 회원가입</h2>
    <p className="sns-signup-description">
      카카오, 네이버, G메일 회원이시면 연동 아이디로 회원가입을 할 수 있습니다.
    </p>
    <div className="sns-signup-icons">
      <img
        src={kakaoLogo}
        alt="Kakao Login"
        className="sns-signup-sns-icon"
        onClick={() =>
          loginHandler("kakao", {
            redirectUri: "http://localhost:5173/auto/kakao/callback",
          })
        }
      />
      <img src={naverLogo} alt="Naver Login" className="sns-signup-sns-icon" />
      <img
        src={googleLogo}
        alt="Google Login"
        className="sns-signup-sns-icon"
      />
    </div>
    <button className="sns-signup-close" onClick={() => window.close()}>
      닫기
    </button>
  </div>
);

export default SignupSns;

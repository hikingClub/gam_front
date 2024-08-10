import React from "react";
import kakaoLogo from "../assets/kakao.png"; // 카카오 로고 이미지 경로
import naverLogo from "../assets/naver.png"; // 네이버 로고 이미지 경로
import googleLogo from "../assets/google.png"; // 구글 로고 이미지 경로
import { useNavigate } from "react-router-dom";
import "../styles/SignupSns.css";

const SignupSns = () => {
  const navigate = useNavigate();

  // SNS 로그인 핸들러
  const handleSnsLogin = provider => {
    let redirectUri;
    switch (provider) {
      case "kakao":
        redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
        break;
      case "naver":
        redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
        break;
      case "google":
        redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
        break;
      default:
        console.error("지원하지 않는 SNS 로그인 제공자입니다.");
    }
  };

  return (
    <div className="sns-signup-container">
      <h2 className="sns-signup-title">SNS 계정으로 회원가입</h2>
      <p className="sns-signup-description">
        카카오, 네이버, 구글 계정으로 회원가입을 할 수 있습니다.
      </p>
      <div className="sns-signup-icons">
        <img
          src={kakaoLogo}
          alt="Kakao Login"
          className="sns-signup-sns-icon"
          onClick={() => handleSnsLogin("kakao")}
        />
        <img
          src={naverLogo}
          alt="Naver Login"
          className="sns-signup-sns-icon"
          onClick={() => handleSnsLogin("naver")}
        />
        <img
          src={googleLogo}
          alt="Google Login"
          className="sns-signup-sns-icon"
          onClick={() => handleSnsLogin("google")}
        />
      </div>
      <button className="sns-signup-close" onClick={() => window.close()}>
        닫기
      </button>
    </div>
  );
};

export default SignupSns;

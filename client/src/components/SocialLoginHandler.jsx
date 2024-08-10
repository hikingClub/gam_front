import React from "react";
import kakaoLogo from "../assets/kakao.png";
import naverLogo from "../assets/naver.png";
import googleLogo from "../assets/google.png";

const SocialLoginHandler = ({ provider }) => {
  const handleLogin = () => {
    let authUrl = "";
    let clientId = "";
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    switch (provider) {
      case "kakao":
        clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
        authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        break;

      case "naver":
        clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
        authUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        break;

      case "google":
        clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
        break;

      default:
        console.error("지원하지 않는 로그인 제공자입니다.");
        return;
    }

    // 인증 URL로 리다이렉트
    window.location.href = authUrl;
  };

  return (
    <div className="sns-icon" onClick={handleLogin}>
      <img
        src={
          provider === "kakao"
            ? kakaoLogo
            : provider === "naver"
              ? naverLogo
              : googleLogo
        }
        alt={`${provider} Login`}
        className={`${provider}-logo`}
      />
    </div>
  );
};

export default SocialLoginHandler;

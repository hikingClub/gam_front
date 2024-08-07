// KakaoLogin.js
import React, { useEffect } from "react";
import kakaoLogo from "../assets/kakao.png";

const KakaoLogin = ({ onLogin }) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("2acd6511c9ba3a8086adbbf0e5322117");
    }
  }, []);

  const handleLogin = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("2acd6511c9ba3a8086adbbf0e5322117");
    }

    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/oauth/kakao/callback", // 로컬 환경용
    });
  };

  return (
    <div className="LoginKakao" onClick={handleLogin}>
      <img src={kakaoLogo} alt="Kakao Login" className="kakao-logo" />
    </div>
  );
};

export default KakaoLogin;

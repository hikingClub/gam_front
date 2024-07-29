import React, { useEffect } from "react";
import kakaoLogo from "../assets/kakao.png";

const KakaoLogin = ({ onLogin }) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("2acd6511c9ba3a8086adbbf0e5322117");
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/auto/kakao/callback",
    });
  };

  return (
    <div className="LoginKakao" onClick={handleLogin}>
      <img src={kakaoLogo} alt="Kakao Login" className="kakao-logo" />
    </div>
  );
};

export default KakaoLogin;

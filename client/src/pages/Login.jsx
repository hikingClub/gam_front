import React from "react";
import kakaoLogo from "../assets/kakao.png";
import "../styles/Login.css";

const Login = () => {
  let REST_API_KEY = "2da7f8f42cbf236e00ee5f2478df7d23";
  let REDIRECT_URI = "https://localhost:5173/user/kakaoLogin";

  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return (
    <div>
      <a href={kakaoToken}>
        <img src={kakaoLogo} className="kakaoLogo" alt="kakaoLogo"></img>
      </a>
    </div>
  );
};

export default Login;

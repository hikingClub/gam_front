import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>여기가 메인 페이지야</h2>
      <Link to="/ModernLogin">
        <button className="login-button">로그인</button>
      </Link>
      <Link to="/ModernLogin">로그인폼 테스트</Link>
    </div>
  );
};

export default Home;

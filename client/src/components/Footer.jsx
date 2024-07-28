import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <a href="#">이용약관</a>
        <a href="#">개인정보처리방침</a>
        <a href="#">자주 묻는 질문</a>
        <a href="#">사이트맵</a>
        <a href="#">의견수렴</a>
        <a href="#">OPEN API</a>
        <a href="#">데이터 개방 신청</a>
      </div>
      <div className="footer-copy">
        Copyright © Korea Software Human Resources Development Institute. All
        Rights Reserved. | 주소: (06567) 서울특별시 서초구 동작대로 132 (방배동,
        안석빌딩) 9층 | 고객센터: pass-word-486
      </div>
    </footer>
  );
};

export default Footer;

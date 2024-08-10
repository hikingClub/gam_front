import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchPW.css";

const SearchPW = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleVerificationClick = async () => {
    try {
      // 이메일 중복 체크
      const checkEmailResponse = await axios.get(
        "http://localhost:8080/member/checkEmail",
        {
          params: { email },
        }
      );

      // 이메일이 일치하는 경우에만 아이디 중복 체크
      if (checkEmailResponse.data) {
        // 아이디 중복 체크
        const checkUidResponse = await axios.get(
          "http://localhost:8080/member/checkUid",
          {
            params: { uid },
          }
        );

        console.log("불러온 아이디:", checkUidResponse);

        // 불러온 아이디를 int로 변환 가능하면 소셜로그인 회원으로 간주
        if (!checkUidResponse.data) {
          setErrorMessage(
            "아이디가 일치하지 않습니다(혹시 소셜로그인 회원이신가요?)"
          );
        } else {
          // 둘 다 일치하는 경우 이메일 인증 요청
          const sendMailResponse = await axios.post(
            "http://localhost:8080/member/sendVerificationMail",
            null,
            {
              params: { email },
            }
          );

          alert(sendMailResponse.data);
          setErrorMessage(""); // 에러 메시지 초기화
        }
      } else {
        setErrorMessage("이메일이 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      setErrorMessage("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="pw-container-main">
      <div className="pw-inner-container-main">
        <div className="pw-container">
          <div className="pw-container-back"></div>
          <div className="pw-title">
            <div
              className="pw-title-id"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <a href="/search-id">아이디 찾기</a>
            </div>
            <div className={`pw-title-pw ${hovered ? "hover" : ""}`}>
              <a href="/search-pw">
                <strong>비밀번호 찾기</strong>
              </a>
            </div>
          </div>
          <div className="pw-input-boxes">
            <div className="pw-nickname-box">
              아이디<span className="pw-required">*</span>
              <input
                type="text"
                placeholder="아이디를 입력하세요."
                className="pw-input-field"
                value={uid}
                onChange={e => setUid(e.target.value)}
              />
            </div>
            <div className="pw-email-box">
              이메일<span className="pw-required">*</span>
              <input
                type="text"
                placeholder="이메일을 입력하세요."
                className="pw-input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          {errorMessage && (
            <p className="search-id-error-message">{errorMessage}</p>
          )}
          <div className="pw-btns">
            <div className="pw-next-btn">
              <button
                className="pw-next-button"
                onClick={handleVerificationClick}
              >
                메일전송
              </button>
            </div>
            <div className="pw-login-btn">
              <button className="pw-login-button" onClick={handleLoginClick}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPW;

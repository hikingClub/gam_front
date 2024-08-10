import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModernLogin.css";
import { useAuth } from "./AuthContext";
import SocialLoginHandler from "./SocialLoginHandler";
import { FcLock } from "react-icons/fc";
import { IoPerson } from "react-icons/io5";
import kingImage from "../assets/king.png";
import NavRight from "./NavRight"; // NavRight 컴포넌트를 임포트

const ModernLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    uid: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isNavRightVisible, setIsNavRightVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const savedUserData = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (savedUserData) {
      setCredentials({
        uid: savedUserData.uid,
        password: "",
      });
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleRememberMeChange = e => {
    setRememberMe(e.target.checked);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleLoginClick(event);
    }
  };

  const handleLoginClick = async e => {
    if (e) {
      e.preventDefault();
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SPRING_API_URL}/member/login`,
        {
          uid: credentials.uid,
          password: credentials.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        const seq = responseData.seq;

        if (rememberMe) {
          sessionStorage.setItem(
            "userCredentials",
            JSON.stringify({ uid: credentials.uid })
          );
        } else {
          sessionStorage.removeItem("userCredentials");
        }

        login(credentials.uid, seq);
        alert("로그인 되었습니다.");
        setIsNavRightVisible(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("로그인 실패\n\n" + error.response.data);
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="log-container-back">
      <div className="log-main-container">
        <div className="log-inner-container">
          <div
            className={`login-section ${hoveredSection === "login" ? "hidden" : ""}`}
            onMouseEnter={() => setHoveredSection("welcome")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {hoveredSection === "login" && (
              <img src={kingImage} alt="King" className="hover-kingImage" />
            )}
            <h2 className="heading-xl">SNS 로그인</h2>
            <p className="sns-text">
              SNS 계정으로 디지털 규장각 이용이 가능합니다.
            </p>

            <div className="social-login">
              <SocialLoginHandler provider="kakao" />
              <SocialLoginHandler provider="naver" />
              <SocialLoginHandler provider="google" />
            </div>
            <a href="/signuptos?type=sns" className="signup-link">
              SNS 계정으로 회원가입하기
            </a>
          </div>
          <div
            className={`welcome-section ${hoveredSection === "welcome" ? "hidden" : ""}`}
            onMouseEnter={() => setHoveredSection("login")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {hoveredSection === "welcome" && (
              <img src={kingImage} alt="King" className="hover-kingImage" />
            )}
            <h2 className="heading-xl welcome-text">일반 로그인</h2>
            <form onSubmit={handleLoginClick}>
              <div className="ilban-inputbox">
                <div className="input-fieldbox-container">
                  <IoPerson className="id-icon" />
                  <input
                    type="text"
                    placeholder="아이디를 입력하세요."
                    name="uid"
                    value={credentials.uid}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="input-fieldbox"
                  />
                </div>
                <div className="input-fieldbox-container">
                  <FcLock className="password-icon" />
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="input-fieldbox"
                  />
                </div>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="remember-me">아이디 저장</label>
              </div>
              <button className="sign-in-btn" type="submit">
                로그인
              </button>
              <div className="login-links">
                <a href="/search-id">아이디 찾기 </a>|{" "}
                <a href="/search-pw">비밀번호 찾기 </a>|{" "}
                <a href="/signuptos?type=general">회원가입</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isNavRightVisible && <NavRight />}
    </div>
  );
};

export default ModernLogin;

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavRight.css";
import { useAuth } from "./AuthContext";

const NavRight = () => {
  const { isLoggedIn, logout, userData } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null); // dropdown 참조를 위한 useRef 추가
  const alarmDropdownRef = useRef(null); // 알림 dropdown 참조를 위한 useRef 추가

  useEffect(() => {
    console.log("isLoggedIn 상태 변경:", isLoggedIn);
    console.log("UserData:", userData);
  }, [isLoggedIn, userData]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowAlarmDropdown(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setShowDropdown(prev => !prev);
    }
  };

  const toggleAlarmDropdown = () => {
    if (isLoggedIn) {
      setShowAlarmDropdown(prev => !prev);
    }
  };

  // userData에서 nickname을 가져옴
  const nickname = userData?.nickname || "";

  console.log("사용자 이름 또는 닉네임: ", nickname);

  // dropdown 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        alarmDropdownRef.current &&
        !alarmDropdownRef.current.contains(event.target)
      ) {
        setShowAlarmDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="button-container">
      {isLoggedIn ? (
        <>
          <span className="welcome-message">
            <strong>{nickname}</strong> 님 환영합니다
          </span>
          <div className="notification-container" ref={alarmDropdownRef}>
            <button
              className="button notification-button"
              onClick={toggleAlarmDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            {showAlarmDropdown && (
              <div className="alarm-dropdown">
                <div className="dropdown-content">
                  <div className="dropdown-header">
                    <h2 className="dropdown-title">구독 알림</h2>
                    <button className="settings-button">구독 알림 설정</button>
                  </div>
                  <div className="notification-content">
                    구독알림이 없습니다.
                  </div>
                  <button className="more-button">더보기 +</button>
                </div>
              </div>
            )}
          </div>
          <div ref={dropdownRef}>
            <button className="user-toggle-button" onClick={toggleDropdown}>
              <span className="dropdown-toggle">
                {showDropdown ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="/mypagemenu" className="dropdown-link">
                  마이페이지
                </a>
                <a href="#" className="dropdown-link">
                  관심키워드
                </a>
                <a href="#" className="dropdown-link">
                  즐겨찾기
                </a>
                <a href="#" onClick={handleLogout} className="dropdown-link">
                  로그아웃
                </a>
              </div>
            )}
          </div>
        </>
      ) : (
        <Link to="/ModernLogin">
          <button className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-log-in"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            로그인
          </button>
        </Link>
      )}
    </div>
  );
};

export default NavRight;

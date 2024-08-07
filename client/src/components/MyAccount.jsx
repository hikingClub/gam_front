import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // AuthContext를 사용하기 위해 임포트
import "../styles/MyAccount.css"; // 스타일을 위한 CSS 파일

const MyAccount = () => {
  const [name, setName] = useState(""); // 사용자의 이름을 저장하는 상태
  const [userId, setUserId] = useState(""); // 사용자의 아이디를 저장하는 상태
  const [email, setEmail] = useState(""); // 사용자의 이메일을 저장하는 상태
  const [emailAlert, setEmailAlert] = useState("no");
  const [mainAlert, setMainAlert] = useState("no");

  const { logout } = useAuth(); // useAuth 훅에서 로그아웃 함수 가져오기

  useEffect(() => {
    // 백엔드에서 사용자 정보를 가져오는 함수
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/mypage/settings",
          {
            withCredentials: true, // 세션 쿠키를 포함하여 요청
          }
        );

        console.log("응답 데이터:", response.data);

        // 응답 데이터에서 필요한 정보 설정
        setName(response.data.nickname); // 사용자 이름 설정
        setUserId(response.data.uid); // 사용자 아이디 설정
        setEmail(response.data.email); // 사용자 이메일 설정
      } catch (error) {
        console.error("설정 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserSettings(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  const handleEmailChange = () => {
    // 이메일 변경 로직을 여기에 추가
    const newEmail = prompt("새 이메일을 입력하세요:", email);
    if (newEmail) {
      setEmail(newEmail);
    }
  };

  const handleQuitClick = async () => {
    if (window.confirm("정말로 회원탈퇴를 하시겠습니까?")) {
      try {
        const response = await axios.post(
          "http://localhost:8080/mypage/settings/quit",
          {},
          {
            withCredentials: true, // 세션 쿠키를 포함하여 요청
          }
        );

        if (response.status === 200) {
          alert("회원 탈퇴가 성공적으로 처리되었습니다.");

          // 로그아웃 처리
          logout();

          // 메인 페이지로 리디렉트
          window.location.href = "/";
        }
      } catch (error) {
        console.error("회원 탈퇴 요청 중 오류 발생:", error);
        alert("회원 탈퇴에 실패하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className="MyAccount-main-container">
      <div className="MyAccount-inner-container">
        <div className="account-section">
          <h2>기본정보</h2>
          <div className="account-info-row">
            <div className="account-info-label">이름</div>
            <div className="account-info-value">{name}</div>
          </div>
          <div className="account-info-row">
            <div className="account-info-label">아이디</div>
            <div className="account-info-value">{userId}</div>
          </div>
          <div className="account-info-row">
            <div className="account-info-label">이메일</div>
            <div className="account-info-value">{email}</div>
            <button className="account-btn" onClick={handleEmailChange}>
              변경
            </button>
          </div>
          <p className="account-note">
            * 회원탈퇴를 원하시면{" "}
            <a href="#" onClick={handleQuitClick}>
              회원탈퇴
            </a>
            를 선택해 주세요.
          </p>
        </div>

        <div className="account-section">
          <h2>간편로그인</h2>
          <div className="account-social-login">
            <div className="account-social-icons">
              <div className="account-icon-kakao">카카오</div>
              <div className="account-icon-naver">네이버</div>
              <div className="account-icon-google">구글</div>
            </div>
          </div>
          <p className="account-note">
            * 간편로그인 아이콘을 클릭하시면 가입 및 해지를 하실 수 있습니다.
          </p>
        </div>

        <div className="account-section">
          <h2>구독 알림 설정</h2>
          <div className="account-subscription-options">
            <div className="account-option">
              <label>이메일 알림 수신 (선택)</label>
              <p>이메일 알림 수신 구독 알림을 받으실 수 있습니다.</p>
              <div className="account-radio">
                <label>
                  <input
                    type="radio"
                    name="emailAlert"
                    value="yes"
                    checked={emailAlert === "yes"}
                    onChange={() => setEmailAlert("yes")}
                  />{" "}
                  예
                </label>
                <label>
                  <input
                    type="radio"
                    name="emailAlert"
                    value="no"
                    checked={emailAlert === "no"}
                    onChange={() => setEmailAlert("no")}
                  />{" "}
                  아니오
                </label>
              </div>
            </div>
            <div className="account-option">
              <label>메인화면 구독알림 적용 (선택)</label>
              <p>
                구독 알림 수신 시 디지털잡지현전에 새로운 정보가 업로드 되었을
                경우 알림을 받으실 수 있습니다.
              </p>
              <div className="account-radio-group-section">
                <label>
                  <input
                    type="radio"
                    name="mainAlert"
                    value="yes"
                    checked={mainAlert === "yes"}
                    onChange={() => setMainAlert("yes")}
                  />{" "}
                  예
                </label>
                <label>
                  <input
                    type="radio"
                    name="mainAlert"
                    value="no"
                    checked={mainAlert === "no"}
                    onChange={() => setMainAlert("no")}
                  />{" "}
                  아니오
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

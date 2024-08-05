import React, { useState } from "react";
import "../styles/MyAccount.css"; // 스타일을 위한 CSS 파일

const MyAccount = () => {
  const [email, setEmail] = useState("jyj022580@gmail.com");
  const [emailAlert, setEmailAlert] = useState("no");
  const [mainAlert, setMainAlert] = useState("no");

  const handleEmailChange = () => {
    // 이메일 변경 로직을 여기에 추가
    const newEmail = prompt("새 이메일을 입력하세요:", email);
    if (newEmail) {
      setEmail(newEmail);
    }
  };

  return (
    <div className="MyAccount-main-container">
      <div className="MyAccount-inner-container">
        <div className="account-section">
          <h2>기본정보</h2>
          <div className="account-info-row">
            <div className="account-info-label">이름</div>
            <div className="account-info-value">정연주</div>
          </div>
          <div className="account-info-row">
            <div className="account-info-label">아이디</div>
            <div className="account-info-value">102550</div>
          </div>
          <div className="account-info-row">
            <div className="account-info-label">이메일</div>
            <div className="account-info-value">{email}</div>
            <button className="account-btn" onClick={handleEmailChange}>
              변경
            </button>
          </div>
          <p className="account-note">
            * 회원탈퇴를 원하시면 <a href="#">회원탈퇴</a>를 선택해 주세요.
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

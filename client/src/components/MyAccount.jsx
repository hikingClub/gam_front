import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../styles/MyAccount.css";
import kakaoLogo from "../assets/kakao.png";
import naverLogo from "../assets/naver.png";
import googleLogo from "../assets/google.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [emailAlert, setEmailAlert] = useState("no");
  const [mainAlert, setMainAlert] = useState("no");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userData, logout } = useAuth(); // authToken 대신 userData를 가져옴

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/mypage/settings",
          {
            withCredentials: true,
          }
        );

        console.log("응답 데이터:", response.data);

        setName(response.data.nickname);
        setUserId(response.data.uid);
        setEmail(response.data.email);
        setMainAlert(response.data.mainAlert); // 기존 설정값 불러오기
      } catch (error) {
        console.error("설정 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserSettings();
  }, []);

  // 메인화면 구독알림 적용 여부를 백엔드로 전송하는 함수
  const handleMainAlertChange = async value => {
    setMainAlert(value);

    try {
      const response = await axios.post(
        `http://localhost:8080/notifications/checked/${userData}`, // userData의 seq를 ID로 사용
        { mainAlert: value },
        {
          withCredentials: true,
        }
      );

      console.log("여기까지는 오니?", userData);
      console.log("여기까지는 오니?", value);

      if (response.status === 200) {
        console.log("메인화면 구독알림 설정 성공:", value);
      }
    } catch (error) {
      console.error("메인화면 구독알림 설정 실패:", error);
    }
  };

  const handlePasswordChange = () => {
    setIsModalOpen(true);
  };

  const handleSubmitPasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[a-zA-Z\d!@#$%^&*+=-]{8,16}$/;

    if (!passwordRegex.test(newPassword)) {
      alert("비밀번호는 8~16자의 영문자 + 숫자 + 특수문자 조합이어야 합니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/mypage/settings/password",
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setIsModalOpen(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경에 실패하였습니다. 다시 시도해 주세요.");
    }
  };

  const handleQuitClick = async () => {
    if (window.confirm("정말로 회원탈퇴를 하시겠습니까?")) {
      try {
        const response = await axios.post(
          "http://localhost:8080/mypage/settings/quit",
          {},
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert("회원 탈퇴가 성공적으로 처리되었습니다.");
          logout();
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
        {/* 기본 정보 섹션 */}
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
          </div>
          <div className="account-info-row">
            <div className="account-info-label">비밀번호</div>
            <input
              type="password"
              className="account-info-value-pw"
              value="********"
              readOnly
            />
            <button className="account-btn" onClick={handlePasswordChange}>
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

        {/* 간편로그인 섹션 */}
        <div className="account-section">
          <h2>간편로그인</h2>
          <div className="account-social-login">
            <div className="account-social-icons">
              <div className="account-icon">
                <img src={kakaoLogo} alt="카카오" className="social-icon-img" />
              </div>
              <div className="account-icon">
                <img src={naverLogo} alt="네이버" className="social-icon-img" />
              </div>
              <div className="account-icon">
                <img src={googleLogo} alt="구글" className="social-icon-img" />
              </div>
            </div>
          </div>
          <p className="account-note">
            * 간편로그인 아이콘을 클릭하시면 가입 및 해지를 하실 수 있습니다.
          </p>
        </div>

        {/* 구독 알림 설정 섹션 */}
        <div className="account-section">
          <h2>구독 알림 설정</h2>
          <div className="account-subscription-options">
            <div className="account-option">
              <label>메인화면 구독알림 적용 (선택)</label>
              <p>
                구독 알림 수신 시 디지털 규장각에 새로운 정보가 업로드 되었을
                경우 알림을 받으실 수 있습니다.
              </p>
              <div className="account-radio-group-section">
                <label>
                  <input
                    type="radio"
                    name="mainAlert"
                    value="yes"
                    checked={mainAlert === "yes"}
                    onChange={() => handleMainAlertChange("yes")}
                  />{" "}
                  예
                </label>
                <label>
                  <input
                    type="radio"
                    name="mainAlert"
                    value="no"
                    checked={mainAlert === "no"}
                    onChange={() => handleMainAlertChange("no")}
                  />{" "}
                  아니오
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-container">
            <h2>비밀번호 변경</h2>
            <div className="custom-password-field">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="기존 비밀번호"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <div className="custom-password-field">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <div className="custom-password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <div className="custom-modal-buttons">
              <button onClick={handleSubmitPasswordChange}>변경</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;

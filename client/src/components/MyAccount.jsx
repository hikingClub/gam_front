import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../styles/MyAccount.css";
import kakaoLogo from "../assets/kakao.png";
import naverLogo from "../assets/naver.png";
import googleLogo from "../assets/google.png";

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

  const handlePasswordChange = async () => {
    const oldPassword = prompt("기존 비밀번호를 입력해주세요.");
    if (oldPassword === null) {
      // 사용자가 취소 버튼을 누르면 함수 종료
      return;
    }

    if (oldPassword && oldPassword.trim() !== "") {
      let newPassword = "";
      let confirmPassword = "";
      const passwordRegex =
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[a-zA-Z\d!@#$%^&*+=-]{8,16}$/;

      // 새로운 비밀번호가 유효한지 확인
      while (!newPassword || !passwordRegex.test(newPassword)) {
        newPassword = prompt(
          "변경할 비밀번호를 입력해주세요 (8~16자의 영문자 + 숫자 + 특수문자 조합):"
        );

        if (newPassword === null) {
          // 사용자가 취소 버튼을 누르면 함수 종료
          return;
        }

        if (!newPassword || !passwordRegex.test(newPassword)) {
          alert(
            "비밀번호는 8~16자의 영문자, 숫자, 특수문자 조합이어야 합니다. 다시 입력해주세요."
          );
        }
      }

      // 비밀번호 확인을 입력받고 일치 여부 확인
      while (newPassword !== confirmPassword) {
        confirmPassword = prompt("변경할 비밀번호를 다시 한 번 입력해주세요.");

        if (confirmPassword === null) {
          // 사용자가 취소 버튼을 누르면 함수 종료
          return;
        }

        if (newPassword !== confirmPassword) {
          alert("두 비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
        }
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/mypage/settings/password",
          {
            oldPassword, // 기존 비밀번호를 포함하여 백엔드로 전달
            newPassword,
          },
          {
            withCredentials: true, // 세션 쿠키를 포함하여 요청
          }
        );

        if (response.status === 200) {
          alert("비밀번호가 성공적으로 변경되었습니다.");
        }
      } catch (error) {
        // 여기서 실패한 이유를 콘솔에 출력
        if (error.response) {
          // 서버에서 응답이 온 경우
          console.error("비밀번호 변경 실패:", error.response.data);
          console.error("상태 코드:", error.response.status);
          console.error("응답 헤더:", error.response.headers);
        } else if (error.request) {
          // 요청이 서버에 도달하지 못한 경우
          console.error("서버 응답이 없습니다:", error.request);
        } else {
          // 다른 이유로 실패한 경우
          console.error("비밀번호 변경 요청 중 오류 발생:", error.message);
        }
        alert("비밀번호 변경에 실패하였습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("기존 비밀번호를 입력해주세요.");
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
          </div>
          <div className="account-info-row">
            <div className="account-info-label">비밀번호</div>
            <input
              type="password"
              className="account-info-value-pw"
              value="********" // 비밀번호는 입력하지 않음
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

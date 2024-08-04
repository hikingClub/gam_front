import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignupForm.css";

const SignupForm = () => {
  const [form, setForm] = useState({
    nickname: "",
    uid: "",
    email: "",
    emailCode: "",
    emailOptIn: "no",
    subscriptionOptIn: "no",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [uidChecked, setUidChecked] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 확인 상태
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 활성화 여부
  const [timeLeft, setTimeLeft] = useState(300); // 3-5분 타이머

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      alert("인증 시간이 만료되었습니다. 다시 인증을 시도해주세요.");
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === "email") {
      setEmailChecked(false);
      setEmailVerified(false); // 이메일이 변경되면 인증 상태 초기화
      setIsTimerActive(false);
      setTimeLeft(300); // 타이머 초기화
    } else if (name === "uid") {
      setUidChecked(false);
    }
  };

  const handleUidCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/member/checkUid?uid=${form.uid}`
      );
      if (response.data) {
        // true면 중복된 아이디
        alert("중복된 아이디입니다.");
      } else {
        // false면 사용 가능한 아이디
        alert("사용 가능한 아이디입니다.");
        setUidChecked(true);
      }
    } catch (error) {
      console.error(
        "Axios 요청 에러:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEmailCheck = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/member/sendVerificationMail?email=${form.email}`
      );
      if (response.status === 200) {
        alert("인증 이메일이 발송되었습니다.");
        setEmailChecked(true);
        setIsTimerActive(true); // 타이머 시작
      }
    } catch (error) {
      console.error(
        "이메일 중복 확인 에러:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // 이메일 인증 확인 요청 함수
  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/member/verifyEmail?email=${form.email}&code=${form.emailCode}`
      );
      if (response.status === 200) {
        alert("이메일 인증 성공!");
        setEmailVerified(true); // 인증 성공 시 상태 업데이트
        setIsTimerActive(false); // 타이머 중지
      }
    } catch (error) {
      console.error(
        "이메일 인증 확인 에러:",
        error.response ? error.response.data : error.message
      );
      alert("이메일 인증 실패: 잘못된 인증 코드입니다.");
      setEmailVerified(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }

    if (!form.uid) {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!uidChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!form.email) {
      alert("이메일을 입력하세요.");
      return;
    }

    if (!emailChecked) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    if (!emailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    if (!form.password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (form.password.length < 8 || form.password.length > 16) {
      alert("비밀번호는 8~16자 사이여야 합니다.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/member/signup",
        {
          nickname: form.nickname,
          uid: form.uid,
          email: form.email,
          password: form.password,
          emailOptIn: form.emailOptIn,
          subscriptionOptIn: form.subscriptionOptIn,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsSubmitted(true);
      } else {
        alert("회원가입에 실패했습니다: " + response.data);
      }
    } catch (error) {
      console.error(
        "회원가입 에러:",
        error.response ? error.response.data : error.message
      );
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="signupform-main-container">
      {isSubmitted ? (
        <div className="signup-success">
          <h2>가입이 완료되었습니다</h2>
          <button onClick={handleNavigateHome}>메인으로 가기</button>
        </div>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-inner">
            <div className="signup-form-title">
              <h2>기본정보입력</h2>
            </div>

            <div className="form-sections">
              <label className="text-indent">
                닉네임<span className="required">*</span>
                <div className="form-group">
                  <input
                    type="text"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    placeholder="닉네임을 입력하세요."
                    required
                    className="form-input"
                  />
                </div>
              </label>

              <label className="text-indent">
                아이디<span className="required">*</span>
                <small>4~10자의 영문 소문자, 숫자만 사용가능합니다.</small>
                <div className="form-group">
                  <input
                    type="text"
                    name="uid"
                    value={form.uid}
                    onChange={handleChange}
                    placeholder="사용할 아이디를 입력해주세요."
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="form-button"
                    onClick={handleUidCheck}
                  >
                    중복확인
                  </button>
                </div>
              </label>

              <label className="text-indent">
                이메일<span className="required">*</span>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="사용할 이메일을 입력해주세요."
                    required
                    className="form-input"
                    autoComplete="email"
                  />
                  {emailChecked ? (
                    <span className="emailcheck-timer">
                      남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="form-button"
                      onClick={handleEmailCheck}
                    >
                      인증번호 전송
                    </button>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="emailCode"
                    value={form.emailCode}
                    onChange={handleChange}
                    placeholder="인증코드를 입력하세요."
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="form-button"
                    onClick={handleVerifyEmail}
                  >
                    인증번호 확인
                  </button>
                </div>
              </label>

              <label className="text-indent">
                비밀번호<span className="required">*</span>
                <small>
                  8~16자의 영문 대소문자 + 숫자 + 특수문자 (영문 대소문자는
                  구분하여 입력하세요) <br />
                  사용 가능한 특수문자: ! @ # $ % ^ & * + = -
                </small>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="사용할 비밀번호를 입력해주세요."
                    required
                    className="form-input"
                  />
                </div>
              </label>

              <label className="text-indent">
                비밀번호 확인<span className="required">*</span>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="입력한 비밀번호를 한번 더 입력해주세요."
                    required
                    className="form-input"
                  />
                </div>
              </label>
              <div className="radios-select">
                <label className="text-indent">
                  이메일 알림 수신(선택)
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="emailOptIn"
                        value="yes"
                        checked={form.emailOptIn === "yes"}
                        onChange={handleChange}
                      />
                      예
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="emailOptIn"
                        value="no"
                        checked={form.emailOptIn === "no"}
                        onChange={handleChange}
                      />
                      아니오
                    </label>
                  </div>
                </label>

                <label className="text-indent">
                  구독 알림 수신(선택)
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="subscriptionOptIn"
                        value="yes"
                        checked={form.subscriptionOptIn === "yes"}
                        onChange={handleChange}
                      />
                      예
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="subscriptionOptIn"
                        value="no"
                        checked={form.subscriptionOptIn === "no"}
                        onChange={handleChange}
                      />
                      아니오
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="submit-button-gayip">
              <button
                type="submit"
                className="form-button-submit-button"
                onClick={handleSubmit}
              >
                가입하기
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;

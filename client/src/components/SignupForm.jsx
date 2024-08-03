import axios from "axios"; // axios 임포트
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === "email") {
      setEmailChecked(false);
    } else if (name === "uid") {
      setUidChecked(false);
    }
  };

  const handleUidCheck = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/check-uid", {
        params: { uid: form.uid },
      });

      if (response.data) {
        alert("중복된 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
        setUidChecked(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 에러:", error);
    }
  };

  const handleEmailCheck = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/check-email",
        {
          params: { email: form.email },
        }
      );

      if (response.data) {
        alert("중복된 이메일입니다.");
      } else {
        alert("사용 가능한 이메일입니다.");
        setEmailChecked(true);
      }
    } catch (error) {
      console.error("이메일 중복 확인 에러:", error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // 모든 조건을 만족했는지 확인
    if (
      form.nickname &&
      form.uid &&
      form.email &&
      form.emailCode &&
      form.password &&
      form.password === form.confirmPassword &&
      emailChecked &&
      uidChecked
    ) {
      try {
        // 백으로 보내서 확인하려고 했는데,, 연결못해서 에러나
        const response = await axios.post("http://localhost:8080/api/signup", {
          nickname: form.nickname,
          uid: form.uid,
          email: form.email,
          password: form.password,
          emailOptIn: form.emailOptIn,
          subscriptionOptIn: form.subscriptionOptIn,
        });
        if (response.data.success) {
          setIsSubmitted(true);
        } else {
          alert("회원가입에 실패했습니다: " + response.data.message);
        }
      } catch (error) {
        console.error("회원가입 에러:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      alert(
        "try문 통과 못했네..(모든 조건을 만족했는지 확인)\n가입 못하는거지 뭐..."
      );
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
              <div className="form-first-section">
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
                    />
                    <button
                      type="button"
                      className="form-button"
                      onClick={handleEmailCheck}
                    >
                      중복확인
                    </button>
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
                    <button type="button" className="form-button">
                      인증확인
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
              </div>

              <div className="form-second-section">
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
              <button type="submit" className="form-button-submit-button">
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

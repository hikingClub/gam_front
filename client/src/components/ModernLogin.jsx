import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../styles/ModernLogin.css";
import SocialLoginHandler from "./SocialLoginHandler";

const ModernLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [credentials, setCredentials] = useState({
    uid: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedUserData = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (savedUserData) {
      setCredentials({
        uid: savedUserData.uid,
        password: "", // 비밀번호는 지워야 함
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

  const handleLoginClick = async () => {
    try {
      console.log("입력된 아이디:", credentials.uid);
      console.log("입력된 비밀번호:", credentials.password);

      const response = await axios.post(
        "http://localhost:8080/member/login",
        {
          uid: credentials.uid,
          password: credentials.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("로그인 요청 성공! 상태 코드:", response.status);
      if (response.status === 200) {
        const responseData = response.data;
        console.log("응답 데이터:", responseData);

        const responseText = responseData.split("세션 SEQ: ");
        const seq =
          responseText.length > 1
            ? parseInt(responseText[1].trim(), 10)
            : undefined;

        if (rememberMe) {
          // 비밀번호는 저장하지 않고 아이디만 저장
          sessionStorage.setItem(
            "userCredentials",
            JSON.stringify({ uid: credentials.uid })
          );
        } else {
          sessionStorage.removeItem("userCredentials");
        }

        login(credentials.uid, seq);

        console.log("로그인 성공:", { uid: credentials.uid, seq });

        alert("로그인 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("로그인 실패\n\n" + error.response.data);
      } else {
        console.error("로그인 요청 중 에러:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="log-container-back">
      <div className="log-inner-container">
        <div
          className="login-section"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
        <div className={`welcome-section ${isHovered ? "hovered" : ""}`}>
          <h2 className="heading-xl welcome-text">일반 로그인</h2>
          <h2 className="heading-xl hover-text">SNS LOGIN</h2>
          <div className="ilban-inputbox">
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              name="uid"
              value={credentials.uid}
              onChange={handleInputChange}
              className="input-fieldbox"
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="input-fieldbox"
            />
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
          <button className="sign-in-btn" onClick={handleLoginClick}>
            로그인
          </button>
          <div className="links">
            <a href="/search-id">아이디 찾기 </a>|{" "}
            <a href="/search-pw">비밀번호 찾기 </a>|{" "}
            <a href="/signuptos?type=general">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLogin;

// 기존 소스
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import googleLogo from "../assets/google.png";
// import kakaoLogo from "../assets/kakao.png";
// import naverLogo from "../assets/naver.png";
// import axios from "axios";
// import { useAuth } from "./AuthContext";
// import "../styles/ModernLogin.css";

// const ModernLogin = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth(); // useAuth 훅을 사용하여 로그인 상태 업데이트
//   const [isHovered, setIsHovered] = useState(false);
//   const [credentials, setCredentials] = useState({
//     uid: "",
//     password: "",
//   });

//   // 입력 필드의 값이 변경될 때 호출되는 함수
//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setCredentials({
//       ...credentials,
//       [name]: value,
//     });
//   };

//   // 로그인 버튼 클릭 시 호출되는 함수
//   const handleLoginClick = async () => {
//     try {
//       // 서버로 로그인 요청을 보냄
//       const response = await axios.post("http://localhost:8080/member/login", {
//         uid: credentials.uid,
//         password: credentials.password,
//       });

//       if (response.status === 200) {
//         const responseData = response.data;
//         console.log("응답 데이터:", responseData);

//         // 서버에서 인증 토큰이랑 사용자 seq 반환
//         const authToken = responseData.authToken;
//         const seq = responseData.seq;

//         if (authToken && seq) {
//           login(seq, authToken); // Context에서 로그인 처리

//           alert("로그인 성공! SEQ: " + seq);
//           navigate("/");
//         } else {
//           alert("로그인 성공! 그러나 인증 토큰을 찾을 수 없습니다.");
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         alert("로그인 실패\n\n" + error.response.data);
//       } else {
//         console.error("로그인 요청 중 에러:", error);
//         alert("로그인 중 오류가 발생했습니다.");
//       }
//     }
//   };

//   return (
//     <div className="log-container-back">
//       <div className="log-inner-container">
//         <div
//           className="login-section"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <h2 className="heading-xl">SNS 로그인</h2>
//           <p className="sns-text">
//             SNS 계정으로 디지털 규장각 이용이 가능합니다.
//           </p>
//           <div className="social-login">
//             <div
//               className="sns-icon"
//               onClick={() =>
//                 loginHandler("kakao", {
//                   redirectUri: "http://localhost:5173/kakao/callback",
//                 })
//               }
//             >
//               <img src={kakaoLogo} alt="Kakao Login" className="kakao-logo" />
//             </div>
//             <div
//               className="sns-icon"
//               onClick={() =>
//                 loginHandler("naver", {
//                   redirectUri:
//                 })
//               }
//             >
//               <img src={naverLogo} alt="Naver Login" className="naver-logo" />
//             </div>
//             <div
//               className="sns-icon"
//               onClick={() =>
//                 loginHandler("google", {
//                   redirectUri: "
//                 })
//               }
//             >
//               <img
//                 src={googleLogo}
//                 alt="Google Login"
//                 className="google-logo"
//               />
//             </div>
//           </div>
//           <a href="/signuptos?type=sns" className="signup-link">
//             SNS 계정으로 회원가입하기
//           </a>
//         </div>
//         <div className={welcome-section ${isHovered ? "hovered" : ""}}>
//           <h2 className="heading-xl welcome-text">일반 로그인</h2>
//           <h2 className="heading-xl hover-text">SNS LOGIN</h2>
//           <div className="ilban-inputbox">
//             <input
//               type="text"
//               placeholder="아이디를 입력하세요."
//               name="uid"
//               value={credentials.uid}
//               onChange={handleInputChange}
//               className="input-fieldbox"
//             />
//             <input
//               type="password"
//               placeholder="비밀번호를 입력하세요."
//               name="password"
//               value={credentials.password}
//               onChange={handleInputChange}
//               className="input-fieldbox"
//             />
//           </div>
//           <div className="checkbox-container">
//             <input type="checkbox" id="remember-me" />
//             <label htmlFor="remember-me">아이디 저장</label>
//           </div>
//           <button className="sign-in-btn" onClick={handleLoginClick}>
//             로그인
//           </button>
//           <div className="links">
//             <a href="/search-id">아이디 찾기 </a>|{" "}
//             <a href="/search-pw">비밀번호 찾기 </a>|{" "}
//             <a href="/signuptos?type=general">회원가입</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModernLogin;

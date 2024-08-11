import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginHandler = ({ provider }) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { login } = useAuth();

  useEffect(() => {
    const socialLogin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SPRING_API_URL}/login/oauth2/callback/${provider}?code=${code}`,
          {
            headers: { "Content-Type": "application/json;charset=utf-8" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 서버로부터의 성공적인 응답 처리
          const userInfo = { nickname: "사용자" }; // 백엔드에서 사용자 정보를 가져오도록 수정 가능
          const token = null; // 토큰이 필요하지 않으면 null, 필요하면 실제 토큰 값 설정

          await login(userInfo, token); // 토큰이 있으면 전달, 없으면 null

          alert("로그인 성공! 홈으로 이동합니다.");
          navigate("/");
        }
      } catch (error) {
        // 에러 발생 시 특별한 처리를 하지 않고 그냥 로그로 남김
        console.error(`${provider} 로그인 중 오류 발생:`, error);
      }
    };

    if (code) {
      socialLogin();
    } else {
      alert("로그인에 실패했습니다. 인가 코드가 없습니다.");
      navigate("/");
    }
  }, [code, navigate, provider, login]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandler;

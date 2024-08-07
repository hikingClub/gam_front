import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const loginHandler = (provider, options) => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth 훅 사용

  if (provider === "kakao") {
    if (!kakaoClientId) {
      console.error("카카오 클라이언트 ID가 정의되지 않았습니다.");
      return;
    }
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${options.redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  }

  // 이후 리다이렉트된 페이지에서 아래 코드를 통해 카카오로부터 받은 데이터를 처리
  // 이 코드는 콜백 페이지에서 실행되어야 합니다.

  const handleLoginClick = async () => {
    try {
      const response = await axios.post("http://localhost:8080/member/login", {
        uid: credentials.uid,
        password: credentials.password,
      });

      if (response.status === 200) {
        const seq = response.data.seq;
        login(credentials.uid, seq); // 로그인 시 세션에 사용자 정보 저장
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 요청 중 에러:", error);
    }
  };
};

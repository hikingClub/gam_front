import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드에서 이미 인가 코드를 처리하고 리다이렉트한 상태이므로, 백엔드의 응답만 처리합니다.
    axios
      .get(
        `${import.meta.env.VITE_APP_SPRING_API_URL}/api/auth/kakao/callback`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 필요한 경우 세션 쿠키 포함
        }
      )
      .then(response => {
        const { status, data } = response;

        // 응답 상태 코드와 데이터 콘솔에 출력
        console.log("Response Status:", status);
        console.log("Response Data:", data);

        if (status >= 200 && status < 300) {
          // 성공적으로 로그인 처리된 경우
          navigate("/"); // 메인 페이지로 이동
        } else {
          console.error("백엔드에서 오류 응답을 받음:", status, data);
          alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
          navigate("/ModernLogin"); // 실패 시 로그인 페이지로 이동
        }
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          console.error(`서버 응답 오류: ${status}`, data);
          alert(`로그인 중 문제가 발생했습니다. 오류 코드: ${status}`);
        } else if (error.request) {
          console.error(
            "네트워크 요청 실패. CORS 설정 또는 서버 가동 상태 확인 필요."
          );
        } else {
          console.error("기타 오류 발생:", error.message);
        }
        navigate("/ModernLogin"); // 에러 발생 시 로그인 페이지로 이동
      });
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default OAuthCallback;

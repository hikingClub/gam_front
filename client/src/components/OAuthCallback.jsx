import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code"); // URL에서 인가 코드를 추출
    const provider = "kakao";

    console.log("OAuthCallback initiated");
    console.log("Code:", code);

    if (code && provider === "kakao") {
      const queryParams = new URLSearchParams({ code }).toString(); // 인가 코드를 URL 파라미터로 변환

      // 환경에 따른 API URL과 Redirect URI 설정
      const apiUrl = "http://localhost:8080";

      console.log("백엔드로 보낼 데이터:", queryParams);
      console.log("API URL:", apiUrl);

      // axios로 GET 요청 보내기
      axios
        .get(`${apiUrl}/oauth/callback/kakao?${queryParams}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 세션 쿠키를 포함하기 위해 credentials 설정
        })
        .then(response => {
          const { status, data } = response;
          console.log(`응답 성공 여부: ${status}`);
          console.log("백엔드 응답 데이터:", data);

          if (status >= 200 && status < 300) {
            const { loginSuccess, message, newUser } = data;

            console.log("로그인 성공 여부:", loginSuccess);
            console.log("서버 메시지:", message);
            console.log("신규 사용자 여부:", newUser);

            if (loginSuccess) {
              if (newUser) {
                // 새 사용자일 경우 처리
                navigate("/ModernLogin");
              } else {
                // 기존 사용자일 경우 처리
                navigate("/");
              }
            } else {
              navigate("/ModernLogin");
            }
          } else {
            console.error("백엔드에서 오류 응답을 받음:", status, data);
            alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
          }
        })
        .catch(error => {
          if (error.response) {
            // 서버에서 응답을 받은 경우
            const { status, data } = error.response;
            console.error(`서버 응답 오류: ${status}`, data);
            alert(`로그인 중 문제가 발생했습니다. 오류 코드: ${status}`);
          } else if (error.request) {
            // 요청이 만들어졌지만, 응답을 받지 못한 경우
            console.error(
              "네트워크 요청 실패. CORS 설정 또는 서버 가동 상태 확인 필요."
            );
          } else {
            // 다른 설정 오류 등
            console.error("기타 오류 발생:", error.message);
          }
        });
    } else {
      console.log("로그인 실패: 유효하지 않은 인증 코드 또는 제공자");
      alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default OAuthCallback;

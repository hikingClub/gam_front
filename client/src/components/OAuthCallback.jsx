import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    // const state = params.get("state");
    const provider = params.get("provider");
    // 어떤 제공자인지 알기 위해 provider 파라미터를 사용

    if (code && provider) {
      let tokenUrl = "";
      let bodyParams = {};

      if (provider === "kakao") {
        tokenUrl = "https://kauth.kakao.com/oauth/token";
        bodyParams = {
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: "http://localhost:5173/auto/kakao/callback",
          //   https://cdn.kyujanggak.com/auto/kakao/callback
          code: code,
        };
        //   } else if (provider === "naver") {
        //     tokenUrl = "https://nid.naver.com/oauth2.0/token";
        //     bodyParams = {
        //       grant_type: "authorization_code",
        //       client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
        //       client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
        //       code: code,
        //       state: state,
        //     };
        //   } else if (provider === "google") {
        //     tokenUrl = "https://oauth2.googleapis.com/token";
        //     bodyParams = {
        //       grant_type: "authorization_code",
        //       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        //       client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        //       redirect_uri: "http://localhost:5173/auto/google/callback",
        //       code: code,
        //     };
      }

      fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 요청Content-Type을 설정해서 URL 인코딩된 형식으로 전송
        },
        body: new URLSearchParams(bodyParams), // bodyParams 객체를 URL 인코딩된 문자열로 변환하여 요청 본문으로 설정
      })
        .then(response => response.json()) // 서버의 응답을 JSON 형식으로 변환
        .then(data => {
          console.log("OAuthCallback.jsx | 액세스 토큰:", data); // 서버로부터 받은 데이터를 콘솔에 출력
          // 로그인 성공 후 액세스 토큰을 사용하여 백엔드 서버에 사용자 정보를 요청하거나, 저장할 수 있습니다.
          navigate("/"); // 메인 페이지로 이동
        })
        .catch(error => {
          console.error("OAuthCallback.jsx | 액세스 토큰 요청 실패:", error);
        });
    } else {
      console.log("OAuthCallback.jsx | 로그인 실패"); // 요청 실패 시 오류를 콘솔에 출력
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default OAuthCallback;

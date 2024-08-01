import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect 실행됨");

    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가코드 : ", code);

    if (!code) {
      console.error("인가코드 없음");
      return;
    }

    const fetchTokenAndUserInfo = async () => {
      try {
        const tokenData = await getToken(code);
        console.log("토큰 데이터:", tokenData);
        const userInfo = await getUserInfo(tokenData.access_token);
        console.log("사용자 정보:", userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        navigate("/");
      } catch (error) {
        console.error("토큰 또는 사용자 정보 가져오기 오류:", error);
      }
    };

    fetchTokenAndUserInfo();
  }, [navigate]);

  // getToken 함수 ===============================================================
  // : 인가 코드를 사용하여 카카오로부터 액세스 토큰을 요청.
  //   백엔드 서버에 주는 데이터 ▼
  // grant_type: "authorization_code"
  // client_id: 카카오 애플리케이션의 클라이언트 ID
  // redirect_uri: 리디렉션 URI
  // code: 인가 코드
  // client_secret: rest api 사용할 경우 보안 강화를 위해 사용하는 값
  // VITE_KAKAO_CLIENT_ID, VITE_KAKAO_CLIENT_SECRET ▶ .env에 있음
  //
  const getToken = async code => {
    try {
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: "http://localhost:5173/auto/kakao/callback",
          code: code,
          client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Token response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting token:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  // getToken 함수 여기까지 =========================================================

  // getUserInfo 함수 ===============================================================
  // : 카카오로부터 사용자 정보를 가져옴.
  //   이 함수를 통해 백엔드 서버는 해당 액세스 토큰을 사용하여 API에서 사용자 정보를 가져올 수 있음
  //   백엔드 서버에 주는 데이터 ▼
  //   Authorization: `Bearer ${accessToken}` === Authorization 헤더: Bearer 타입의 액세스 토큰
  //   Bearer는? JWT 혹은 OAuth에 대한 토큰을 사용하는 인증타입!
  //
  const getUserInfo = async accessToken => {
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting user info:", error);
      throw error;
    }
  };
  // getUserInfo 함수 여기까지 ===============================================================
  return (
    <div>
      <h1>로그인 중입니다~ 기다려주세용</h1>
    </div>
  );
};

export default KakaoRedirect;

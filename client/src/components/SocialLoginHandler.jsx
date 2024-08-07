import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import kakaoLogo from "../assets/kakao.png";
import naverLogo from "../assets/naver.png";
import googleLogo from "../assets/google.png";

const SocialLoginHandler = ({ provider }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // 환경 변수를 직접 사용하거나, 값이 없을 경우를 대비해 기본값을 설정
    const kakaoClientId =
      import.meta.env.VITE_KAKAO_CLIENT_ID || "your_kakao_client_id";
    const naverClientId =
      import.meta.env.VITE_NAVER_CLIENT_ID || "your_naver_client_id";
    const googleClientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID || "your_google_client_id";

    let authUrl = "";
    let redirectUri = "";

    switch (provider) {
      case "kakao":
        if (!kakaoClientId) {
          console.error("카카오 클라이언트 ID가 정의되지 않았습니다.");
          return;
        }
        // 로컬 환경의 Redirect URI 설정
        redirectUri = "http://localhost:5173/oauth/kakao/callback";
        authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;
        break;

      // 만약 Naver와 Google 로그인이 추가로 구현되어야 한다면, 여기에 추가
      case "naver":
        if (!naverClientId) {
          console.error("네이버 클라이언트 ID가 정의되지 않았습니다.");
          return;
        }
        redirectUri = "http://localhost:5173/oauth/naver/callback";
        authUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${redirectUri}&response_type=code`;
        break;

      case "google":
        if (!googleClientId) {
          console.error("구글 클라이언트 ID가 정의되지 않았습니다.");
          return;
        }
        redirectUri = "http://localhost:5173/oauth/google/callback";
        authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
        break;

      default:
        console.error("지원하지 않는 로그인 제공자입니다.");
        return;
    }

    // 인증 URL로 리다이렉트
    window.location.href = authUrl;
  };

  return (
    <div className="sns-icon" onClick={handleLogin}>
      <img
        src={
          provider === "kakao"
            ? kakaoLogo
            : provider === "naver"
              ? naverLogo
              : googleLogo
        }
        alt={`${provider} Login`}
        className={`${provider}-logo`}
      />
    </div>
  );
};

export default SocialLoginHandler;

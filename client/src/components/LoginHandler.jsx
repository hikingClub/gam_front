// src/components/LoginHandler.jsx

export const loginHandler = (provider, options) => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  console.log("카카오 클라이언트 ID:", kakaoClientId);
  //   const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 환경 변수 추가 필요
  //   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // 환경 변수 추가 필요

  if (provider === "kakao") {
    if (!kakaoClientId) {
      console.error("카카오 클라이언트 ID가 정의되지 않았습니다.");
      return;
    }
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${options.redirectUri}&response_type=code`;
    console.log("카카오 인증 URL:", kakaoAuthUrl); // 디버깅을 위해 추가
    window.location.href = kakaoAuthUrl;
  } else {
    console.log("지원하지 않는 로그인 제공자:", provider);
  }
};

//   } else if (provider === "naver") {
//     const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${options.redirectUri}&response_type=code&state=STATE_STRING`;
//     window.location.href = naverAuthUrl;
//   } else if (provider === "google") {
//     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${options.redirectUri}&response_type=code&scope=email%20profile`;
//     window.location.href = googleAuthUrl;

// src/components/LoginHandler.jsx

export const loginHandler = (provider, options) => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  //   const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 환경 변수 추가 필요
  //   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // 환경 변수 추가 필요

  if (provider === "kakao") {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${options.redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
    //   } else if (provider === "naver") {
    //     const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${options.redirectUri}&response_type=code&state=STATE_STRING`;
    //     window.location.href = naverAuthUrl;
    //   } else if (provider === "google") {
    //     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${options.redirectUri}&response_type=code&scope=email%20profile`;
    //     window.location.href = googleAuthUrl;
  } else {
    console.log("LoginHandler.jsx | 지원하지 않는 로그인 제공자:", provider);
  }
};

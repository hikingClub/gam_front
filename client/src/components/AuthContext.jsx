import React, { createContext, useState, useContext, useEffect } from "react";

// AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setIsLoggedIn(true);
    }
  }, []);

  const login = userInfo => {
    sessionStorage.setItem("user", JSON.stringify(userInfo));
    setUserData(userInfo);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//.
//.
//.
//.
// 밑에는 인증토큰값을 헤더에 저장하는거

// import React, { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     sessionStorage.getItem("isLoggedIn") === "true"
//   );
//   const [authToken, setAuthToken] = useState(
//     sessionStorage.getItem("authToken") || ""
//   );

//   // 로그인 상태와 인증 토큰을 초기화할 때 콘솔에 출력
//   useEffect(() => {
//     console.log("초기 로그인 상태:", isLoggedIn);
//     console.log("초기 인증 토큰:", authToken);
//   }, []);

//   const login = (seq, token) => {
//     sessionStorage.setItem("loggedInUserSeq", seq);
//     sessionStorage.setItem("isLoggedIn", "true");
//     sessionStorage.setItem("authToken", token); // 인증 토큰을 세션에 저장
//     setIsLoggedIn(true);
//     setAuthToken(token); // 인증 토큰 상태 업데이트

//     // 로그인 시 콘솔에 출력
//     console.log("로그인 성공");
//     console.log("저장된 사용자 Seq:", seq);
//     console.log("저장된 인증 토큰:", token);
//   };

//   const logout = () => {
//     sessionStorage.removeItem("loggedInUserSeq");
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("authToken"); // 인증 토큰 제거
//     setIsLoggedIn(false);
//     setAuthToken(""); // 인증 토큰 상태 초기화

//     // 로그아웃 시 콘솔에 출력
//     console.log("로그아웃 성공");
//   };

//   // 상태 변화가 있을 때마다 콘솔에 출력
//   useEffect(() => {
//     console.log("현재 로그인 상태:", isLoggedIn);
//     console.log("현재 인증 토큰:", authToken);
//   }, [isLoggedIn, authToken]);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

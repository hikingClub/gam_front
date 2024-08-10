import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("user");
    const storedAuthToken = sessionStorage.getItem("authToken");

    if (storedUserData && storedUserData !== "undefined") {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);

        if (storedAuthToken && storedAuthToken !== "undefined") {
          setAuthToken(storedAuthToken);
        }
      } catch (error) {
        console.error("Stored user data is not valid JSON:", error);
      }
    }
  }, []);

  const login = (uid, seq) => {
    const userInfo = { uid, seq };
    sessionStorage.setItem("user", JSON.stringify(userInfo));
    setUserData(userInfo);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUserData({ uid: null, seq: null });
    setIsLoggedIn(false);

    console.log("로그아웃 성공");
  };

  useEffect(() => {
    console.log("현재 로그인 상태:", isLoggedIn);
    console.log("현재 사용자 데이터:", userData);
    console.log("현재 인증 토큰:", authToken);
  }, [isLoggedIn, userData, authToken]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, authToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

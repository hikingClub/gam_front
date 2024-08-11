import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  //   const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("user");
    // const storedAuthToken = sessionStorage.getItem("authToken");

    if (storedUserData && storedUserData !== "undefined") {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);

        //     if (storedAuthToken && storedAuthToken !== "undefined") {
        //       setAuthToken(storedAuthToken);
        //     }
      } catch (error) {
        console.error("Stored user data is not valid JSON:", error);
      }
    }
  }, []);

  const login = async (userInfo = null) => {
    if (userInfo) {
      sessionStorage.setItem("user", JSON.stringify(userInfo));
      setUserData(userInfo);
      setIsLoggedIn(true);

      //   if (token) {
      //     sessionStorage.setItem("authToken", token);
      //     setAuthToken(token);
      //   }

      // 사용자 설정 정보 가져오기 (토큰이 필요할 경우 인증 헤더에 포함)
      //   try {
      //     const config = token
      //       ? {
      //           headers: { Authorization: `Bearer ${token}` },
      //           withCredentials: true,
      //         }
      //       : { withCredentials: true };

      //     const response = await axios.get(
      //       `${import.meta.env.VITE_APP_SPRING_API_URL}/mypage/settings`,
      //       config
      //     );

      //     if (response.status === 200) {
      //       const fetchedUserData = response.data;
      //       setUserData(fetchedUserData);
      //       sessionStorage.setItem("user", JSON.stringify(fetchedUserData));
      //     }
      //   } catch (error) {
      //     console.error("사용자 설정 정보를 가져오는 데 실패했습니다.", error);
      //   }

      console.log("로그인 성공");
      console.log("저장된 사용자 데이터:", userInfo);
      //   console.log("저장된 인증 토큰:", token);
    } else {
      console.error("Invalid userInfo provided for login");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    // sessionStorage.removeItem("authToken");

    setUserData(null);
    // setAuthToken("");
    setIsLoggedIn(false);

    console.log("로그아웃 성공");
  };

  useEffect(() => {
    console.log("현재 로그인 상태:", isLoggedIn);
    console.log("현재 사용자 데이터:", userData);
    // console.log("현재 인증 토큰:", authToken);
  }, [isLoggedIn, userData]); //authToken

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, login, logout }} // authToken,
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";

// AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ uid: null, seq: null });

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setIsLoggedIn(true);
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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

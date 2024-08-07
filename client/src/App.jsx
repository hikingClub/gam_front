// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import OAuthCallback from "./components/OAuthCallback"; // 변경
import MainContent from "./components/MainContent";
import ModernLogin from "./components/ModernLogin";
import MyPageMenu from "./components/MyPageMenu";
import Navbar from "./components/Navbar";
import SearchID from "./components/SearchID";
import SearchPW from "./components/SearchPW";
import SignupForm from "./components/SignupForm";
import SignupTos from "./components/SignupTos";
import SearchPage from "./pages/SearchPage";
import MyUsageSearch from "./components/MyUsageSearch";
import { AuthProvider } from "./components/AuthContext";
import "./styles/App.css";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<MainContent />} />
      {/* 검색 관련 */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/media" element={<SearchPage />} />
      {/* 로그인 및 회원가입 관련 */}
      <Route path="/ModernLogin" element={<ModernLogin />} />
      <Route path="/signuptos" element={<SignupTos />} />
      <Route path="/signupform" element={<SignupForm />} />
      <Route path="/search-id" element={<SearchID />} />
      <Route path="/search-pw" element={<SearchPW />} />
      {/* OAuth 콜백 처리 */}
      <Route path="/oauth/kakao/callback" element={<OAuthCallback />} />
      {/* 마이페이지 관련 */}
      <Route path="/mypagemenu" element={<MyPageMenu />} />
      {/* 마이페이지 검색기록 불러오기 */}
      <Route path="/myusagesearch" element={<MyUsageSearch />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <>
          <Navbar />
          <AppRoutes />
          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;

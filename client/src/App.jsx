import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
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
import DetailContent from "./components/DetailContent";
import LoginHandler from "./components/LoginHandler";
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
      {/* OAuth 콜백 처리_카카오로그인 */}
      <Route
        path="/login/oauth2/callback/kakao"
        element={<LoginHandler provider="kakao" />}
      />
      {/* 마이페이지 관련 */}
      <Route path="/mypagemenu" element={<MyPageMenu />} />
      {/* 마이페이지 검색기록 불러오기 */}
      <Route path="/myusagesearch" element={<MyUsageSearch />} />
      {/* 상세보기 페이지 */}
      <Route path="/detail" element={<DetailContent />} />
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

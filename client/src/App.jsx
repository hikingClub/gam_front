import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import KakaoRedirect from "./components/KakaoRedirect";
import MainContent from "./components/MainContent";
import ModernLogin from "./components/ModernLogin";
import MyPageMenu from "./components/MyPageMenu";
import Navbar from "./components/Navbar";
import SearchID from "./components/SearchID";
import SearchPW from "./components/SearchPW";
import SignupForm from "./components/SignupForm";
import SignupTos from "./components/SignupTos";
import SearchPage from "./pages/SearchPage";
import TestPage from "./pages/TestPage";
import "./styles/App.css";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 검색관련 */}
      <Route path="/test" element={<TestPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/media" element={<SearchPage />} />
      {/* 로그인 및 회원가입 관련 */}
      <Route path="/ModernLogin" element={<ModernLogin />} />
      <Route path="/signuptos" element={<SignupTos />} />
      <Route path="/signupform" element={<SignupForm />} />
      <Route path="/search-id" element={<SearchID />} />
      <Route path="/search-pw" element={<SearchPW />} />
      <Route path="/auto/kakao/callback" element={<KakaoRedirect />} />
      {/* 마이페이지 관련 */}
      <Route path="/mypagemenu" element={<MyPageMenu />} />{" "}
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;

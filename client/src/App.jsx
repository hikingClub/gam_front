import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import KakaoRedirect from "./components/KakaoRedirect";
import MainContent from "./components/MainContent";
import ModernLogin from "./components/ModernLogin";
import Navbar from "./components/Navbar";
import SearchID from "./components/SearchID";
import SearchPW from "./components/SearchPW";
import SignupForm from "./components/SignupForm";
import SignupTos from "./components/SignupTos";
import SearchPage from "./pages/SearchPage";
import TestPage from "./pages/TestPage";
import "./styles/App.css";
import MyUsageSearch from "./components/MyUsageSearch";
import MyUsageView from "./components/MyUsageView";
import MyPageMenu from "./components/MyPageMenu";

const AppContent = () => {
  const location = useLocation();

  // 특정 경로에서만 main-content div를 렌더링
  const renderMainContent = location.pathname === "/";

  return (
    <>
      <Navbar />
      {renderMainContent && (
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      )}
      <Routes>
        {/* 검색관련 */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/test" element={<TestPage />} />
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
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

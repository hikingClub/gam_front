import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Marquee from "./components/Marquee";
import ModernLogin from "./components/ModernLogin";
import MyPageMenu from "./components/MyPageMenu";
import MyUsageSearch from "./components/MyUsageSearch";
import Navbar from "./components/Navbar";
import OAuthCallback from "./components/OAuthCallback"; // 변경
import SearchID from "./components/SearchID";
import SearchPW from "./components/SearchPW";
import SignupForm from "./components/SignupForm";
import SignupTos from "./components/SignupTos";
import SearchPage from "./pages/SearchPage";
import UpdatedPage from "./pages/UpdatedPage";
import "./styles/App.css";
import { fetchData } from "./utils/updateGet";

const AppRoutes = () => {
  const [data, setData] = useState({ new: [], updated: [], deleted: [] });
  const [dataCounts, setDataCounts] = useState({
    new: 0,
    updated: 0,
    deleted: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      classifyData(fetchedData);
    };

    const classifyData = data => {
      const classifiedData = { new: [], updated: [], deleted: [] };
      data.forEach(item => {
        switch (item.status) {
          case "신규":
            classifiedData.new.push(item);
            break;
          case "수정":
            classifiedData.updated.push(item);
            break;
          case "삭제":
            classifiedData.deleted.push(item);
            break;
          default:
            break;
        }
      });
      setData(classifiedData);
      updateCounts(classifiedData);
    };

    const updateCounts = classifiedData => {
      setDataCounts({
        new: classifiedData.new.length,
        updated: classifiedData.updated.length,
        deleted: classifiedData.deleted.length,
      });
    };

    loadData();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Marquee dataCounts={dataCounts} />
            <MainContent />
          </>
        }
      />{" "}
      {/* Marquee와 MainContent를 함께 렌더링 */}
      {/* 상단바 관련 */}
      <Route path="/updated" element={<UpdatedPage data={data} />} />
      {/* 검색관련 */}
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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

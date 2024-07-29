import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import TestPage from "./pages/TestPage";
import "./styles/App.css";

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/test" element={<TestPage />} />
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

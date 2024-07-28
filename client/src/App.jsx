import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import TestPage from "./pages/TestPage";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

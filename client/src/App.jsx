// App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/App.css";
// import Login from "./pages/Login";
// import Login from "./components/Login";
import Home from "./components/Home";
import KakaoRedirect from "./components/KakaoRedirect";
import ModernLogin from "./components/ModernLogin";
import SearchID from "./components/SearchID";
import SearchPW from "./components/SearchPW";
import SignupForm from "./components/SignupForm";
import SignupTos from "./components/SignupTos";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/ModernLogin" element={<ModernLogin />} />
          <Route path="/signuptos" element={<SignupTos />} />
          <Route path="/signupform" element={<SignupForm />} />
          <Route path="/search-id" element={<SearchID />} />
          <Route path="/search-pw" element={<SearchPW />} />
          <Route path="/auto/kakao/callback" element={<KakaoRedirect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

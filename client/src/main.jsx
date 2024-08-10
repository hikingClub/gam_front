import "regenerator-runtime/runtime"; // Babel을 사용하여 async/await 문법을 트랜스파일링할 때, 이 문법을 지원하기 위해 regeneratorRuntime이 필요

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

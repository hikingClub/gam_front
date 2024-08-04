// ErrorPage.jsx
import React from "react";

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>오류가 발생했습니다</h1>
        <p style={styles.message}>
          죄송합니다. 페이지를 로드하는 중 문제가 발생했습니다. 아래 버튼을
          클릭하여 홈으로 돌아가거나 페이지를 새로고침하세요.
        </p>
        <div style={styles.buttons}>
          <button
            style={styles.button}
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
          <button
            style={styles.button}
            onClick={() => (window.location.href = "/")}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

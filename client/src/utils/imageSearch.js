import axios from "axios";

const VITE_APP_FLASK_API_URL = import.meta.env.VITE_APP_FLASK_API_URL;

// 이미지 검색 API 호출 함수
export const uploadImageForSearch = async file => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("file", file); // 이미지 파일 추가

    // Flask 서버의 /upload 엔드포인트로 POST 요청을 보냄
    const response = await axios.post(
      `${VITE_APP_FLASK_API_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 서버로부터 받은 결과 반환
    return response.data;
  } catch (error) {
    console.error("이미지 업로드 중 오류가 발생했습니다:", error);
    return { status: "error", message: "이미지 업로드 실패" };
  }
};

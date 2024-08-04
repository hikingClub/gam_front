import axios from "axios";

const VITE_APP_FLASK_API_URL = import.meta.env.VITE_APP_FLASK_API_URL;

// 자동완성 API 호출 함수
export const fetchAutocompleteSuggestions = async query => {
  try {
    // Flask 서버의 /autocomplete 엔드포인트로 POST 요청을 보냄
    const response = await axios.post(
      `${VITE_APP_FLASK_API_URL}/autocomplete`,
      {
        query: query,
      }
    );
    return response.data; // 제안된 검색어 리스트 반환
  } catch (error) {
    console.error("자동완성 요청 중 오류가 발생했습니다:", error);
    return [];
  }
};

import axios from "axios";

const VITE_APP_FLASK_API_URL = import.meta.env.VITE_APP_FLASK_API_URL;

// 추천 검색 API 호출 함수
export const fetchRecommendSearch = async ({
  user_id,
  keyword,
  pageNum = "1",
  pagePer = "100",
}) => {
  try {
    const response = await axios.post(
      `${VITE_APP_FLASK_API_URL}/recommend_search`,
      {
        user_id: user_id,
        keyword: keyword,
        pageNum: pageNum,
        pagePer: pagePer,
      }
    );
    return response.data; // 검색 결과 반환
  } catch (error) {
    console.error("추천 검색 요청 중 오류가 발생했습니다:", error);
    return { status: "error", message: error.message };
  }
};

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_SPRING_API_URL; // '/api'에서 이걸로 수정

// 2.0ver: pagePer추가
export const fetchData = async (searchKeyword, pagePer) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/keyword`, {
      params: {
        searchKeyword: searchKeyword,
        pagePer: pagePer,
      },
    });
    console.log("응답결과", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

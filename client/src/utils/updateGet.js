import axios from "axios";

const VITE_APP_FLASK_API_URL =
  import.meta.env.VITE_APP_FLASK_API_URL || "http://localhost:5000";

/**
 * Fetches update data from the Flask API.
 * @returns {Promise<Array>} A promise that resolves to an array of data records.
 */
export const fetchData = async () => {
  try {
    const response = await axios.post(`${VITE_APP_FLASK_API_URL}/get_data`, {
      // *필요한 요청 본문 데이터를 추가
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

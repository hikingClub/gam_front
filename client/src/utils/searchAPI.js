import axios from "axios";

const API_ENDPOINT = "/api";
// 2.0ver: pagePer추가
export const fetchData = async (searchKeyword, pagePer) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/search/keyword`, {
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

// * 백업 - 1.0ver: 20개씩만 가져와짐ㅇㅇ.
// export const fetchData = async searchKeyword => {
//   try {
//     const response = await axios.get(`${API_ENDPOINT}/search/keyword`, {
//       params: {
//         searchKeyword: searchKeyword,
//       },
//     });
//     console.log("응답결과", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

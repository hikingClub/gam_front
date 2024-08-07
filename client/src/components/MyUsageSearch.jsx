import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../styles/MyUsageSearch.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "./AuthContext"; // AuthContext에서 인증 상태를 가져옵니다.

const MyUsageSearch = () => {
  const [searchHistory, setSearchHistory] = useState([]); // 검색 기록 저장 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 보이는 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 표시할 목록이 10개씩
  const { isLoggedIn, userData } = useAuth(); // AuthContext를 통해 로그인 상태와 유저 데이터를 가져옴

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("로그인 상태가 아닙니다.");
      return; // 로그인 상태가 아닐 경우 함수 종료
    }

    const fetchSearchHistory = async () => {
      try {
        const params = new URLSearchParams({
          pageNum: currentPage + 1, // 페이지 번호는 1부터 시작
          pagePer: itemsPerPage, // 페이지당 항목 수
        });

        console.log("로그인은 됐습니다");

        const response = await axios.get(
          `http://localhost:8080/mypage/kwdhistory?${params.toString()}`,
          {
            withCredentials: true, // 세션 쿠키를 포함해 요청
            headers: {
              "X-User-ID": userData.uid, // 사용자 ID
              "X-User-Seq": Number(userData.seq), // 사용자 시퀀스 번호
            },
          }
        );

        // 응답 확인
        console.log("응답 전체:", response);

        // 응답 데이터만 출력하고 싶을 때
        console.log("응답 데이터:", response.data);

        // 서버로부터 받은 데이터를 배열 형태로 정렬하고 저장
        let result = Array.isArray(response.data) ? response.data : [];

        // 검색어 기록을 최신 시간순으로 정렬
        result = result.sort(
          (a, b) => new Date(b.keywordTime) - new Date(a.keywordTime)
        );

        setSearchHistory(result);
        console.log("정렬된 검색 기록:", result);
      } catch (error) {
        console.error("요청 중 발생한 에러:", error);

        if (error.response && error.response.status === 401) {
          console.error(
            "로그인 상태가 아닙니다. 로그인 후 다시 시도해 주세요."
          );
          // 로그인 페이지로 리다이렉트하거나 사용자에게 알림
        } else {
          console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        }
      }
    };

    fetchSearchHistory();
  }, [currentPage, isLoggedIn, userData]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // 현재 페이지에 해당하는 데이터를 가져오는 함수
  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchHistory.slice(startIndex, endIndex);
  };

  // 빈 행을 렌더링하여 테이블 레이아웃 유지
  const renderEmptyRows = () => {
    const emptyRows = [];
    const dataLength = getPaginatedData().length;
    if (dataLength < itemsPerPage) {
      for (let i = dataLength; i < itemsPerPage; i++) {
        emptyRows.push(
          <tr key={`empty-${i}`} className="search-history-tr-empty-row">
            <td className="search-history-td" colSpan="3"></td>
          </tr>
        );
      }
    }
    return emptyRows;
  };

  return (
    <div className="usage-search">
      <div className="usage-search-title">
        <h3>검색어 이력</h3>
      </div>
      <div className="usage-search-content">
        <table className="search-history-table">
          <thead className="search-history-thead">
            <tr>
              <th className="search-history-th">NO.</th>
              <th className="search-history-th">검색어</th>
              <th className="search-history-th">검색 일시</th>
            </tr>
          </thead>
          <tbody className="search-history-tbody">
            {getPaginatedData().map((item, index) => (
              <tr key={index} className="search-history-tr">
                <td className="search-history-td">
                  {currentPage * itemsPerPage + index + 1}
                </td>
                <td className="search-history-td" title={item.keyword}>
                  {item.keyword}
                </td>
                <td className="search-history-td">{item.keywordTime}</td>
              </tr>
            ))}
            {renderEmptyRows()}
          </tbody>
        </table>
      </div>
      <div className="mysearch-pagination-container">
        <ReactPaginate
          previousLabel={<FaArrowLeft />}
          nextLabel={<FaArrowRight />}
          pageCount={Math.ceil(searchHistory.length / itemsPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default MyUsageSearch;

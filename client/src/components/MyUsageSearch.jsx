import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../styles/MyUsageSearch.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MyUsageSearch = () => {
  const [searchHistory, setSearchHistory] = useState([]); // 빈 배열로 초기화
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // 사용자의 seq를 세션 스토리지에서 가져오기
  const loggedInUserSeq = sessionStorage.getItem("loggedInUserSeq");
  console.log("로그인된 사용자 번호:", loggedInUserSeq);

  useEffect(() => {
    console.log("useEffect 실행됨");
    const fetchSearchHistory = async () => {
      console.log("fetchSearchHistory 실행됨");
      try {
        console.log("try 실행됨");
        const params = {
          pageNum: currentPage + 1,
          pagePer: itemsPerPage,
          userSeq: loggedInUserSeq,
        };

        console.log("Sending request with params:", params);

        const response = await axios.get(
          "http://localhost:8080/mypage/kwdhistory",
          { params }
        );

        console.log("응답 데이터:", response.data);
        const result = Array.isArray(response.data) ? response.data : [];
        setSearchHistory(result);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchSearchHistory();
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchHistory.slice(startIndex, endIndex);
  };

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

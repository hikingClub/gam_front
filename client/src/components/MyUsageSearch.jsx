import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/MyUsageSearch.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const searchHistoryData = [
  { seq: 1, term: "500", timestamp: "2024.07.30 05:45:12" },
  {
    seq: 2,
    term: "혹시 검색어가 길어질 경우 '...'으로 표시 되도록 설정 중이에요 정말이지 진짜 너무 더워서 치약이라도 바르고 싶어요",
    timestamp: "2024.07.24 16:05:28",
  },
  { seq: 3, term: "404에러", timestamp: "2024.07.24 12:18:56" },
  { seq: 4, term: "사회", timestamp: "2024.07.23 15:53:34" },
  { seq: 5, term: "데이터", timestamp: "2024.07.23 11:33:09" },
  { seq: 6, term: "이클립스", timestamp: "2024.07.23 11:31:15" },
  { seq: 7, term: "몬스터", timestamp: "2024.07.23 11:29:46" },
  { seq: 8, term: "유산균", timestamp: "2024.07.23 11:29:37" },
  { seq: 9, term: "에너지드링크", timestamp: "2024.07.23 11:29:27" },
  { seq: 10, term: "물티슈 한 장만 꺼내줘", timestamp: "2024.07.23 11:29:25" },
  { seq: 11, term: "데이터프레임", timestamp: "2024.07.22 11:31:15" },
  { seq: 12, term: "몬스터", timestamp: "2024.07.21 10:29:46" },
  { seq: 13, term: "각성 효과", timestamp: "2024.07.20 09:29:37" },
  { seq: 14, term: "에너지드링크", timestamp: "2024.07.20 20:29:27" },
  { seq: 15, term: "와이파이", timestamp: "2024.07.24 16:05:28" },
  { seq: 16, term: "딥러닝", timestamp: "2024.07.24 12:18:56" },
  { seq: 17, term: "사회", timestamp: "2024.07.23 15:53:34" },
  { seq: 18, term: "데이터", timestamp: "2024.07.23 11:33:09" },
  { seq: 19, term: "물티슈 한 장만 꺼내줘", timestamp: "2024.07.20 01:29:25" },
];

const MyUsageSearch = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchHistoryData.slice(startIndex, endIndex);
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
                <td className="search-history-td">{item.seq}</td>
                <td className="search-history-td" title={item.term}>
                  {item.term}
                </td>
                <td className="search-history-td">{item.timestamp}</td>
              </tr>
            ))}
            {renderEmptyRows()}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<FaArrowLeft />}
          nextLabel={<FaArrowRight />}
          pageCount={Math.ceil(searchHistoryData.length / itemsPerPage)}
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

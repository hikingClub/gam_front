import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/MyUsageView.css";
import "../styles/Pagination.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, Stack } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const viewHistoryData = [
  { term: "자바프로그래밍", timestamp: "2024.07.30 05:45:12" },
  {
    term: "애미야 국이 짜다 니 바닷물로 국 끄륳냐아",
    timestamp: "2024.07.24 16:05:28",
  },
  { term: "딥러닝", timestamp: "2024.07.24 12:18:56" },
  { term: "사회에 쓸모있는 존재가 되자", timestamp: "2024.07.23 15:53:34" },
  {
    term: "에어컨 좀 틀어주세요 더워죽겠어요 정말이지 진짜 너무 더워서 치약이라도 바르고 싶어요",
    timestamp: "2024.07.23 11:33:09",
  },
  { term: "와이파이", timestamp: "2024.07.24 16:05:28" },
  { term: "딥러닝", timestamp: "2024.07.24 12:18:56" },
  { term: "사회", timestamp: "2024.07.23 15:53:34" },
  { term: "데이터", timestamp: "2024.07.23 11:33:09" },
  { term: "이클립스", timestamp: "2024.07.23 11:31:15" },
  { term: "몬스터", timestamp: "2024.07.23 11:29:46" },
  { term: "유산균", timestamp: "2024.07.23 11:29:37" },
  { term: "에너지드링크", timestamp: "2024.07.23 11:29:27" },
  { term: "물티슈 한 장만 꺼내줘", timestamp: "2024.07.23 11:29:25" },
  { term: "데이터프레임", timestamp: "2024.07.22 11:31:15" },
  { term: "몬스터", timestamp: "2024.07.21 10:29:46" },
  { term: "각성 효과", timestamp: "2024.07.20 09:29:37" },
];

const MyUsageView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const itemsPerPage = 5;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return viewHistoryData.slice(startIndex, endIndex);
  };

  const handleSelectAll = event => {
    if (event.target.checked) {
      const allItems = getPaginatedData().map((_, index) => index);
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = index => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDelete = () => {
    const remainingItems = getPaginatedData().filter(
      (_, index) => !selectedItems.includes(index)
    );
    const updatedData = [
      ...viewHistoryData.slice(0, currentPage * itemsPerPage),
      ...remainingItems,
      ...viewHistoryData.slice((currentPage + 1) * itemsPerPage),
    ];
    setSelectedItems([]);
    // Update the data with the new array after deletion
    // This line assumes you are storing the data in a state
    // setViewHistoryData(updatedData);
    // Or if you are using a database, send the updated data to your backend server
  };

  const renderEmptyRows = () => {
    const emptyRows = [];
    const dataLength = getPaginatedData().length;
    if (dataLength < itemsPerPage) {
      for (let i = dataLength; i < itemsPerPage; i++) {
        emptyRows.push(
          <tr key={`empty-${i}`} className="view-history-tr-empty-row">
            <td className="view-history-td" colSpan="3"></td>
          </tr>
        );
      }
    }
    return emptyRows;
  };

  return (
    <div className="usage-view">
      <div className="usage-view-title">
        <h3>조회 이력</h3>
        <Stack direction="row" spacing={1}>
          <Chip
            label="삭제"
            onClick={handleDelete}
            deleteIcon={<DeleteIcon />}
            variant="outlined"
          />
        </Stack>
      </div>
      <div className="usage-view-content">
        <table className="view-history-table">
          <thead className="view-history-thead">
            <tr>
              <th className="view-history-th">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    getPaginatedData().length > 0 &&
                    selectedItems.length === getPaginatedData().length
                  }
                />
              </th>
              <th className="view-history-th">조회 자료</th>
              <th className="view-history-th">조회 일시</th>
            </tr>
          </thead>
          <tbody className="view-history-tbody">
            {getPaginatedData().map((item, index) => (
              <tr
                key={index}
                className={`view-history-tr ${
                  selectedItems.includes(index) ? "selected" : ""
                }`}
              >
                <td className="view-history-td">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => handleSelectItem(index)}
                  />
                </td>
                <td className="view-history-td" title={item.term}>
                  {item.term}
                </td>
                <td className="view-history-td">{item.timestamp}</td>
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
          pageCount={Math.ceil(viewHistoryData.length / itemsPerPage)}
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

export default MyUsageView;

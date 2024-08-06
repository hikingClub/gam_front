import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../styles/MyUsageView.css";
import "../styles/Pagination.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, Stack } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MyUsageView = ({ searchHistory = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewHistoryData, setViewHistoryData] = useState([]);

  // searchHistory가 변경될 때만 viewHistoryData를 업데이트
  useEffect(() => {
    if (searchHistory.length > 0) {
      setViewHistoryData(searchHistory);
    }
  }, [searchHistory]);

  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getPaginatedData = () => {
    if (!viewHistoryData || viewHistoryData.length === 0) return [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return viewHistoryData.slice(startIndex, endIndex);
  };

  const [selectedItems, setSelectedItems] = useState([]);

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
    setViewHistoryData(updatedData); // Update the state with the new data
    setSelectedItems([]); // Clear the selected items
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../styles/MyUsageView.css";
import "../styles/Pagination.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, Stack } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "./AuthContext"; // AuthContext에서 인증 상태를 가져옵니다.

const MyUsageView = () => {
  const [viewHistoryData, setViewHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const { isLoggedIn, userData } = useAuth(); // AuthContext를 통해 로그인 상태와 유저 데이터를 가져옴
  const itemsPerPage = 10;

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("로그인 상태가 아닙니다.");
      return; // 로그인 상태가 아닐 경우 함수 종료
    }

    const fetchViewHistory = async () => {
      try {
        const params = new URLSearchParams({
          pageNum: currentPage + 1, // 페이지 번호는 1부터 시작
          pagePer: itemsPerPage, // 페이지당 항목 수
        });

        const response = await axios.get(
          `http://localhost:8080/mypage/viewhistory?${params.toString()}`,
          {
            withCredentials: true, // 세션 쿠키를 포함해 요청
            headers: {
              "X-User-ID": userData.uid, // 사용자 ID
              "X-User-Seq": Number(userData.seq), // 사용자 시퀀스 번호
            },
          }
        );

        console.log("응답 전체:", response);

        // 서버로부터 받은 데이터를 배열 형태로 저장
        let result = Array.isArray(response.data) ? response.data : [];

        // 조회 기록을 최신 시간순으로 정렬
        result = result.sort(
          (a, b) => new Date(b.viewTime) - new Date(a.viewTime)
        );

        setViewHistoryData(result);
        console.log("정렬된 조회 기록:", result);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        if (error.response && error.response.status === 401) {
          alert("로그인 상태가 아닙니다. 로그인 후 다시 시도해 주세요.");
        }
      }
    };

    fetchViewHistory();
  }, [currentPage, isLoggedIn, userData]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    setSelectedItems([]); // 페이지가 변경되면 선택된 항목을 초기화
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return viewHistoryData.slice(startIndex, endIndex);
  };

  const handleSelectAll = event => {
    if (event.target.checked) {
      const allItems = getPaginatedData().map(
        (_, index) => currentPage * itemsPerPage + index
      );
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = index => {
    const globalIndex = currentPage * itemsPerPage + index;
    if (selectedItems.includes(globalIndex)) {
      setSelectedItems(selectedItems.filter(item => item !== globalIndex));
    } else {
      setSelectedItems([...selectedItems, globalIndex]);
    }
  };

  const handleDelete = () => {
    const remainingItems = viewHistoryData.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setViewHistoryData(remainingItems);
    setSelectedItems([]);
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

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
                  selectedItems.includes(currentPage * itemsPerPage + index)
                    ? "selected"
                    : ""
                }`}
              >
                <td className="view-history-td">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(
                      currentPage * itemsPerPage + index
                    )}
                    onChange={() => handleSelectItem(index)}
                  />
                </td>
                <td className="view-history-td" title={item.viewTitle}>
                  {item.viewTitle}
                </td>
                <td className="view-history-td">
                  {formatTimestamp(item.viewTime)}
                </td>
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

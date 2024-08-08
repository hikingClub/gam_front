import { AddCircleOutline, DeleteOutline, Update } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  Modal,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function UpdatedPage({ data }) {
  const [open, setOpen] = useState(null);
  const [pageInfo, setPageInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({}); // 초기값을 빈 객체로 설정

  console.log("이게 카드여닫할때도 계속 출력됨-해결하기", data);

  useEffect(() => {
    // 각 데이터 카테고리에 대한 pageInfo 초기화
    const initialPageInfo = {
      1: { page: 0, rowsPerPage: 5 }, // 신규 데이터
      2: { page: 0, rowsPerPage: 5 }, // 수정 데이터
      3: { page: 0, rowsPerPage: 5 }, // 삭제 데이터
    };
    setPageInfo(initialPageInfo);
  }, []);

  const handleOpenModal = detail => {
    setSelectedDetail(detail);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClick = id => {
    setOpen(open === id ? null : id);
  };

  const handleChangePage = (id, newPage) => {
    setPageInfo({
      ...pageInfo,
      [id]: {
        ...pageInfo[id],
        page: newPage,
      },
    });
  };

  const handleChangeRowsPerPage = (id, event) => {
    setPageInfo({
      ...pageInfo,
      [id]: {
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      },
    });
  };

  const postedData = [
    {
      id: 1,
      category: "신규 데이터",
      count: data.new.length,
      details: "새로 추가된 데이터 내역입니다",
      moreDetails: data.new.map(item => ({
        title: item.title,
        type: item.type,
        classification: item.classification,
        description: item.description,
        publisher: item.publisher,
        date: item.date,
        identifier: item.identifier,
      })),
    },
    {
      id: 2,
      category: "수정 데이터",
      count: data.updated.length,
      details: "기존 데이터에서 수정된 내역입니다",
      moreDetails: data.updated.map(item => ({
        title: item.title,
        type: item.type,
        classification: item.classification,
        description: item.description,
        publisher: item.publisher,
        date: item.date,
        identifier: item.identifier,
      })),
    },
    {
      id: 3,
      category: "삭제 데이터",
      count: data.deleted.length,
      details: "삭제된 데이터 내역입니다",
      moreDetails: data.deleted.map(item => ({
        title: item.title,
        type: item.type,
        classification: item.classification,
        description: item.description,
        publisher: item.publisher,
        date: item.date,
        identifier: item.identifier,
      })),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, m: 3, marginTop: 15 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          m: 4,
          fontWeight: "bold",
          fontSize: "1.5rem",
          borderBottom: "2px solid #1976d2",
          maxWidth: "500px",
          paddingBottom: "8px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      >
        데이터 업데이트 현황
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {postedData.map(item => (
          <Grid item xs={12} md={3} key={item.id}>
            <Card
              raised
              sx={{
                minHeight: 200,
                border:
                  open === item.id ? "2px solid #1976d2" : "1px solid #e0e0e0",
              }}
              onClick={() => handleClick(item.id)}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.category === "신규 데이터" && (
                    <AddCircleOutline
                      sx={{ verticalAlign: "middle", mr: 1, color: "green" }}
                    />
                  )}
                  {item.category === "수정 데이터" && (
                    <Update
                      sx={{ verticalAlign: "middle", mr: 1, color: "orange" }}
                    />
                  )}
                  {item.category === "삭제 데이터" && (
                    <DeleteOutline
                      sx={{ verticalAlign: "middle", mr: 1, color: "red" }}
                    />
                  )}
                  {item.category}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
                  {item.count.toLocaleString()}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.details}
                </Typography>
              </CardContent>
              <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.moreDetails
                    .slice(
                      pageInfo[item.id]?.page *
                        pageInfo[item.id]?.rowsPerPage || 0,
                      (pageInfo[item.id]?.page *
                        pageInfo[item.id]?.rowsPerPage || 0) +
                        (pageInfo[item.id]?.rowsPerPage || 5)
                    )
                    .map((detail, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          button
                          onClick={() => handleOpenModal(detail)}
                        >
                          <Typography variant="body2">{`${index + 1 + (pageInfo[item.id]?.page || 0) * (pageInfo[item.id]?.rowsPerPage || 5)}. ${detail.title}`}</Typography>
                        </ListItem>
                        {index < item.moreDetails.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  <TablePagination
                    component="div"
                    count={item.moreDetails.length}
                    rowsPerPage={pageInfo[item.id]?.rowsPerPage || 5}
                    page={pageInfo[item.id]?.page || 0}
                    onPageChange={(event, newPage) => {
                      event.stopPropagation();
                      handleChangePage(item.id, newPage);
                    }}
                    onRowsPerPageChange={event => {
                      handleChangeRowsPerPage(item.id, event);
                    }}
                    onMouseDown={event => {
                      event.stopPropagation(); // 이벤트 전파를 여기서 중지
                    }}
                    rowsPerPageOptions={[5, 10]}
                  />
                </List>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            상세 정보
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <strong>유형:</strong> {selectedDetail.type}
            <br />
            <strong>분류:</strong> {selectedDetail.classification}
            <br />
            <strong>기관:</strong> {selectedDetail.publisher}
            <br />
            <strong>날짜:</strong> {selectedDetail.date}
            <br />
            <strong>요약:</strong> {selectedDetail.description}
            <br />
            <strong>원본링크:</strong>{" "}
            <a
              href={selectedDetail.identifier}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedDetail.identifier}
            </a>
          </Typography>
          <Button onClick={handleCloseModal}>닫기</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default UpdatedPage;

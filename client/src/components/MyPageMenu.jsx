import React, { useState, useEffect } from "react";
import "../styles/MyPageMenu.css";
import { styled } from "@mui/system";
import {
  Tabs,
  Tab,
  TabsList,
  TabPanel,
  tabClasses,
  buttonClasses,
} from "@mui/base";
import MyUsageSearch from "./MyUsageSearch";
import MyUsageView from "./MyUsageView";
import MySymhis from "./MySymhis";
import MyRecommend from "./MyRecommend";
import MySubscription from "./MySubscription";
import MyAccessReq from "./MyAccessReq";
import MyAccount from "./MyAccount";

const blue = {
  50: "#0037581a", // rgb(0, 55, 88, 0.1)
  100: "#00375833", // rgb(0, 55, 88, 0.2)
  200: "#0037584d", // rgb(0, 55, 88, 0.3)
  300: "#00375866", // rgb(0, 55, 88, 0.4)
  400: "#00375880", // rgb(0, 55, 88, 0.5)
  500: "#00375899", // rgb(0, 55, 88, 0.6)
  600: "#003758b3", // rgb(0, 55, 88, 0.7)
  700: "#003758cc", // rgb(0, 55, 88, 0.8)
  800: "#003758e6", // rgb(0, 55, 88, 0.9)
  900: "#003758", // rgb(0, 55, 88)
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledTab = styled(Tab)`
  color: ${grey[700]};
  cursor: pointer;
  font-size: 0.975rem;
  font-weight: 600;
  background-color: transparent;
  width: 50%;
  padding: 8px 10px;
  margin: 6px;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[300]};
    color: white;
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[800]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[800]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: flex;
  height: 60vh;
  font-size: 0.975rem;
  padding: 1rem;
  background: ${({ theme }) =>
    theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: none;
  border-radius: 0.5rem;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  gap: 1rem;
  overflow: hidden;

  /* high-zoom 상태에서의 스타일 조정 */
  .high-zoom & {
    height: auto; /* 높이를 자동으로 조정 */
    flex: 1; /* 가용 공간을 모두 차지 */
    max-height: 90vh; /* 최대 높이 설정 */
    overflow-y: auto; /* 스크롤 가능하도록 설정 */
  }
`;

const StyledTabsList = styled(TabsList)`
  min-width: 200px;
  background-color: ${blue[100]};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px
    ${({ theme }) => (theme.palette.mode === "dark" ? grey[900] : grey[200])};
`;

const MyPageMenu = () => {
  const [tabValue, setTabValue] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const storedNickname = localStorage.getItem("nickname");
      const storedEmail = localStorage.getItem("email");

      if (storedNickname) {
        setNickname(storedNickname);
      } else {
        setNickname("알 수 없음"); // 기본값 설정
      }

      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        setEmail("알 수 없음"); // 기본값 설정
      }
    } catch (error) {
      console.error("로컬 스토리지 접근 에러:", error);
      setNickname("에러 발생");
      setEmail("에러 발생");
    }
  }, []);

  return (
    <div className="mymenubar-container">
      <div className="mymenubar-title">
        <div
          className="title-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="mypagetitle" style={{ textAlign: "left" }}>
            마이페이지
          </div>
          <div style={{ textAlign: "right" }}>
            <p>
              <strong>{nickname}</strong>&nbsp;님&nbsp;&nbsp;/&nbsp;&nbsp;
              {email}
            </p>
          </div>
        </div>
        <div className="mymenubar-sidebar">
          <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
            <StyledTabsList>
              <StyledTab value={0}>이용내역</StyledTab>
              <StyledTab value={1}>공감내역</StyledTab>
              <StyledTab value={2}>추천설정</StyledTab>
              <StyledTab value={3}>구독설정</StyledTab>
              <StyledTab value={4}>데이터 개방신청 내역</StyledTab>
              <StyledTab value={5}>계정관리</StyledTab>
            </StyledTabsList>
            <StyledTabPanel value={0} hidden={tabValue !== 0}>
              <div className="usage-container">
                <div className="usage-component1">
                  <MyUsageSearch />
                </div>
                <div className="vertical-line"></div>
                <div className="usage-component2">
                  <MyUsageView />
                </div>
              </div>
            </StyledTabPanel>
            <StyledTabPanel value={1} hidden={tabValue !== 1}>
              <MySymhis />
            </StyledTabPanel>
            <StyledTabPanel value={2} hidden={tabValue !== 2}>
              <MyRecommend />
            </StyledTabPanel>
            <StyledTabPanel value={3} hidden={tabValue !== 3}>
              <MySubscription />
            </StyledTabPanel>
            <StyledTabPanel value={4} hidden={tabValue !== 4}>
              <MyAccessReq />
            </StyledTabPanel>
            <StyledTabPanel value={5} hidden={tabValue !== 5}>
              <MyAccount />
            </StyledTabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyPageMenu;

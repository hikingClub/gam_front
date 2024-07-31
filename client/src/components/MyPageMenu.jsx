import React, { useState } from "react";
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

const purple = {
  50: "#D2D2FF",
  100: "#C8C8FF",
  200: "#B4B4FF",
  300: "#A0A0FF",
  400: "#8C8FF",
  500: "#8282FF",
  600: "#7878FF",
  700: "#6E6EFF",
  800: "#6464FF",
  900: "#5A5AFF",
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
    background-color: ${purple[500]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${purple[500]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${purple[700]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  display: flex;
  height: 51vh;
  font-size: 0.975rem;
  padding: 0.2rem;
  background: ${({ theme }) =>
    theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: none; /* 경계선 제거 */
  border-radius: 0.5rem;
  display: ${({ hidden }) => (hidden ? "none" : "flex")}; /* 가로 배치 적용 */
  gap: 1rem;
  overflow: hidden; /* 넘치는 내용을 숨김 */
`;

const StyledTabsList = styled(TabsList)`
  min-width: 200px;
  background-color: ${purple[100]};
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
  const name = "정연주";
  const email = "jyj022580@gmail.com";

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
              <strong>{name}</strong>&nbsp;님&nbsp;&nbsp;/&nbsp;&nbsp;{email}
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

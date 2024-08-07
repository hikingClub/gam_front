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
import { useAuth } from "./AuthContext";

const blue = {
  50: "#0037581a",
  100: "#00375833",
  200: "#0037584d",
  300: "#00375866",
  400: "#00375880",
  500: "#00375899",
  600: "#003758b3",
  700: "#003758cc",
  800: "#003758e6",
  900: "#003758",
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

  .high-zoom & {
    height: auto;
    flex: 1;
    max-height: 90vh;
    overflow-y: auto;
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
  const { isLoggedIn, userData } = useAuth();

  useEffect(() => {
    console.log("userData:", userData);
  }, [userData]);

  // userData에서 필요한 속성 추출
  const uid = userData?.uid;
  const name = userData?.name;

  // displayName 결정 로직
  const displayName = userData
    ? userData.name
      ? name || uid // 소셜 로그인 사용자는 name이 있으면 표시, 없으면 uid
      : JSON.stringify(userData) // 일반 로그인 사용자는 전체 userData 객체를 문자열로 변환하여 표시
    : "사용자";

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
              <strong>{displayName}</strong> 님
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

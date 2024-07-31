import React, { useState } from "react";
import "../styles/MyRecommend.css";

const MyRecommend = () => {
  const [subFields, setSubFields] = useState([]);
  const [selectedSubFields, setSelectedSubFields] = useState([]);
  const [selectedInterestTypes, setSelectedInterestTypes] = useState([]);

  const handleMainFieldClick = field => {
    let subFieldOptions = [];
    if (field === "과학") {
      subFieldOptions = [
        "수학",
        "통계학",
        "물리학",
        "천문학",
        "화학",
        "생물학",
        "지구과학",
        "지질학",
        "대기과학",
        "생활과학",
      ];
    } else if (field === "기술") {
      subFieldOptions = [
        "기계공학",
        "재료공학",
        "화학공학",
        "전기·전자",
        "정보·통신",
        "인공지능·컴퓨팅",
        "에너지·자원",
        "원자력",
        "환경공학",
        "토목·건설·교통",
        "도시공학",
        "항공우주공학",
        "조선·해양",
      ];
    } else if (field === "인문") {
      subFieldOptions = [
        "문학",
        "언어",
        "철학",
        "종교",
        "심리",
        "역사",
        "지리",
      ];
    } else if (field === "사회") {
      subFieldOptions = [
        "공공질서·안전",
        "복지",
        "사회문제",
        "인권",
        "국토·지역개발",
        "일반공공행정",
        "외교",
        "안보국방",
        "경제·경영",
        "산업",
        "정치",
      ];
    } else if (field === "교육") {
      subFieldOptions = [
        "유아",
        "초등학교",
        "중학교",
        "고등학교",
        "고등(대학)",
        "해외유학",
        "특수교육",
        "직업·평생",
        "자격",
        "교양",
      ];
    } else if (field === "의료") {
      subFieldOptions = [
        "의학",
        "치의학",
        "한의학",
        "약학",
        "간호학",
        "공중보건",
        "질병관리",
        "건강검진",
        "재활",
        "요양",
        "의료공학",
        "의약품",
      ];
    } else if (field === "문화") {
      subFieldOptions = [
        "미술",
        "방송·미디어 ",
        "공예",
        "게임·오락",
        "축제·전시",
        "연극",
        "무용",
        "영상·영화",
        "음악",
        "디자인",
        "사진",
        "만화",
        "스포츠",
      ];
    }

    setSubFields(subFieldOptions);
  };

  const handleSubFieldClick = subField => {
    setSelectedSubFields(prev => {
      if (prev.includes(subField)) {
        return prev.filter(field => field !== subField);
      } else if (prev.length < 5) {
        return [...prev, subField];
      } else {
        alert("최대 5개까지 선택 가능합니다.");
        return prev;
      }
    });
  };

  const handleInterestTypeClick = type => {
    setSelectedInterestTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else if (prev.length < 5) {
        return [...prev, type];
      } else {
        alert("최대 5개까지 선택 가능합니다.");
        return prev;
      }
    });
  };

  const resetSelectedSubFields = () => {
    setSelectedSubFields([]);
  };

  const resetSelectedInterestTypes = () => {
    setSelectedInterestTypes([]);
  };

  return (
    <div className="myrecommend-container">
      <div className="myrecommend-inner-container">
        <div className="recommend-first-section">
          <div className="section-header">
            <h3>분야선택</h3>
            <button className="reset-button" onClick={resetSelectedSubFields}>
              초기화
            </button>
          </div>
          <p>최대 5개까지 선택 가능합니다.</p>
          <div className="recommend-fields">
            <div className="main-fields">
              <div className="main-field-title">
                대분류
                <hr />
              </div>
              <div className="main-fields-content">
                <button onClick={() => handleMainFieldClick("과학")}>
                  과학
                </button>
                <button onClick={() => handleMainFieldClick("기술")}>
                  기술
                </button>
                <button onClick={() => handleMainFieldClick("인문")}>
                  인문
                </button>
                <button onClick={() => handleMainFieldClick("사회")}>
                  사회
                </button>
                <button onClick={() => handleMainFieldClick("교육")}>
                  교육
                </button>
                <button onClick={() => handleMainFieldClick("의료")}>
                  의료
                </button>
                <button onClick={() => handleMainFieldClick("문화")}>
                  문화
                </button>
              </div>
            </div>
            <div className="sub-fields">
              <div className="selected-fields-title">
                중분류
                <hr />
              </div>
              <div className="selected-fields-content">
                {subFields.map((field, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubFieldClick(field)}
                    className={
                      selectedSubFields.includes(field) ? "selected" : ""
                    }
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
            <div className="recommend-selection-summary-first">
              <div className="summary-title-first">선택 분야</div>
              <div className="selected-fields-display-first">
                {selectedSubFields.map((field, index) => (
                  <span key={index} className="selected-field">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="recommend-second-section">
          <div className="section-header">
            <h3>관심유형</h3>
            <button
              className="reset-button"
              onClick={resetSelectedInterestTypes}
            >
              초기화
            </button>
          </div>
          <p>최대 5개까지 선택 가능합니다.</p>
          <div className="interest-types">
            <button
              onClick={() => handleInterestTypeClick("교전")}
              className={
                selectedInterestTypes.includes("교전") ? "selected" : ""
              }
            >
              교전
            </button>
            <button
              onClick={() => handleInterestTypeClick("기록물")}
              className={
                selectedInterestTypes.includes("기록물") ? "selected" : ""
              }
            >
              기록물
            </button>
            <button
              onClick={() => handleInterestTypeClick("논문")}
              className={
                selectedInterestTypes.includes("논문") ? "selected" : ""
              }
            >
              논문
            </button>
            <button
              onClick={() => handleInterestTypeClick("도서")}
              className={
                selectedInterestTypes.includes("도서") ? "selected" : ""
              }
            >
              도서
            </button>
            <button
              onClick={() => handleInterestTypeClick("멀티미디어")}
              className={
                selectedInterestTypes.includes("멀티미디어") ? "selected" : ""
              }
            >
              멀티미디어
            </button>
            <button
              onClick={() => handleInterestTypeClick("법령")}
              className={
                selectedInterestTypes.includes("법령") ? "selected" : ""
              }
            >
              법령
            </button>
            <button
              onClick={() => handleInterestTypeClick("보고서")}
              className={
                selectedInterestTypes.includes("보고서") ? "selected" : ""
              }
            >
              보고서
            </button>
            <button
              onClick={() => handleInterestTypeClick("신문/잡지")}
              className={
                selectedInterestTypes.includes("신문/잡지") ? "selected" : ""
              }
            >
              신문/잡지
            </button>
            <button
              onClick={() => handleInterestTypeClick("용어정보")}
              className={
                selectedInterestTypes.includes("용어정보") ? "selected" : ""
              }
            >
              용어정보
            </button>
            <button
              onClick={() => handleInterestTypeClick("인물정보")}
              className={
                selectedInterestTypes.includes("인물정보") ? "selected" : ""
              }
            >
              인물정보
            </button>
            <button
              onClick={() => handleInterestTypeClick("특허")}
              className={
                selectedInterestTypes.includes("특허") ? "selected" : ""
              }
            >
              특허
            </button>
          </div>
          <div className="recommend-selection-summary-second">
            <div className="summary-title-second">선택 항목</div>
            <div className="selected-fields-display-second">
              {selectedInterestTypes.map((type, index) => (
                <span key={index} className="selected-field">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="recommend-third-section">
          <h3>추가정보</h3>
          <p>
            추가정보를 등록하시면 연령대, 직업군별 관심 있는 검색내역을 보실 수
            있습니다.
          </p>
          <div className="additional-info">
            <div className="info-item">
              <label>연령대</label>
              <select>
                <option>10대 미만</option>
                <option>10대</option>
                <option>20대</option>
                <option>30대</option>
                <option>40대</option>
                <option>50대</option>
                <option>60대</option>
                <option>60대 이상</option>
              </select>
            </div>
            <div className="info-item">
              <label>직업군</label>
              <select>
                <option>사무직</option>
                <option>연구직</option>
                <option>공학기술직</option>
                <option>공무원</option>
                <option>공공기관 구성원</option>
                <option>보건·의료직</option>
                <option>문화·예술·디자인·방송직</option>
                <option>스포츠·레크리에이션직</option>
                <option>서비스직</option>
                <option>영업·판매직</option>
                <option>운전·운송직</option>
                <option>설치·정비·생산직</option>
                <option>농림어업직</option>
                <option>기관장·임원·부서장</option>
                <option>학생</option>
                <option>대학(원)생</option>
                <option>주부</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecommend;

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
        { id: 1, name: "수학" },
        { id: 2, name: "통계학" },
        { id: 3, name: "물리학" },
        { id: 4, name: "천문학" },
        { id: 5, name: "화학" },
        { id: 6, name: "생물학" },
        { id: 7, name: "지구과학" },
        { id: 8, name: "지질학" },
        { id: 9, name: "대기과학" },
        { id: 10, name: "생활과학" },
      ];
    } else if (field === "기술") {
      subFieldOptions = [
        { id: 11, name: "기계공학" },
        { id: 12, name: "재료공학" },
        { id: 13, name: "화학공학" },
        { id: 14, name: "전기·전자" },
        { id: 15, name: "정보·통신" },
        { id: 16, name: "인공지능·컴퓨팅" },
        { id: 17, name: "에너지·자원" },
        { id: 18, name: "원자력" },
        { id: 19, name: "환경공학" },
        { id: 20, name: "토목·건설·교통" },
        { id: 21, name: "도시공학" },
        { id: 22, name: "항공우주공학" },
        { id: 23, name: "조선·해양" },
      ];
    } else if (field === "인문") {
      subFieldOptions = [
        { id: 24, name: "문학" },
        { id: 25, name: "언어" },
        { id: 26, name: "철학" },
        { id: 27, name: "종교" },
        { id: 28, name: "심리" },
        { id: 29, name: "역사" },
        { id: 30, name: "지리" },
      ];
    } else if (field === "사회") {
      subFieldOptions = [
        { id: 31, name: "공공질서·안전" },
        { id: 32, name: "복지" },
        { id: 33, name: "사회문제" },
        { id: 34, name: "인권" },
        { id: 35, name: "국토·지역개발" },
        { id: 36, name: "일반공공행정" },
        { id: 37, name: "외교" },
        { id: 38, name: "안보국방" },
        { id: 39, name: "경제·경영" },
        { id: 40, name: "산업" },
        { id: 41, name: "정치" },
      ];
    } else if (field === "교육") {
      subFieldOptions = [
        { id: 42, name: "유아" },
        { id: 43, name: "초등학교" },
        { id: 44, name: "중학교" },
        { id: 45, name: "고등학교" },
        { id: 46, name: "고등(대학)" },
        { id: 47, name: "해외유학" },
        { id: 48, name: "특수교육" },
        { id: 49, name: "직업·평생" },
        { id: 50, name: "자격" },
        { id: 51, name: "교양" },
      ];
    } else if (field === "의료") {
      subFieldOptions = [
        { id: 52, name: "의학" },
        { id: 53, name: "치의학" },
        { id: 54, name: "한의학" },
        { id: 55, name: "약학" },
        { id: 56, name: "간호학" },
        { id: 57, name: "공중보건" },
        { id: 58, name: "질병관리" },
        { id: 59, name: "건강검진" },
        { id: 60, name: "재활" },
        { id: 61, name: "요양" },
        { id: 62, name: "의료공학" },
        { id: 63, name: "의약품" },
      ];
    } else if (field === "문화") {
      subFieldOptions = [
        { id: 64, name: "미술" },
        { id: 65, name: "방송·미디어" },
        { id: 66, name: "공예" },
        { id: 67, name: "게임·오락" },
        { id: 68, name: "축제·전시" },
        { id: 69, name: "연극" },
        { id: 70, name: "무용" },
        { id: 71, name: "영상·영화" },
        { id: 72, name: "음악" },
        { id: 73, name: "디자인" },
        { id: 74, name: "사진" },
        { id: 75, name: "만화" },
        { id: 76, name: "스포츠" },
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
                {subFields.map(field => (
                  <button
                    key={field.id} // 객체의 고유 id를 키로 사용
                    onClick={() => handleSubFieldClick(field.name)} // 객체의 name 속성만 전달
                    className={
                      selectedSubFields.includes(field.name) ? "selected" : ""
                    }
                  >
                    {field.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="recommend-selection-summary-first">
              <div className="summary-title-first">
                선택
                <br />
                분야
              </div>
              <div className="selected-fields-display-first">
                {selectedSubFields.map((field, index) => (
                  <span
                    key={index}
                    className="selected-field"
                    onClick={() => handleSubFieldClick(field)} // 클릭 시 선택 해제
                  >
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
            <div className="summary-title-second">
              선택
              <br />
              항목
            </div>
            <div className="selected-fields-display-second">
              {selectedInterestTypes.map((type, index) => (
                <span
                  key={index}
                  className="selected-field"
                  onClick={() => handleInterestTypeClick(type)} // 클릭 시 선택 해제
                >
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
              <select className="additional-info-select">
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
              <select className="additional-info-select">
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
      <div className="reco-submit-button">저장하기</div>
    </div>
  );
};

export default MyRecommend;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/MyRecommend.css";

const MyRecommend = () => {
  const [subFields, setSubFields] = useState([]); // 대분류 상태
  const [selectedSubFields, setSelectedSubFields] = useState([]); // 선택된 중분류 상태 (이름과 ID를 함께 저장)
  const [selectedInterestTypes, setSelectedInterestTypes] = useState([]); // 관심유형 상태
  const [ageRange, setageRange] = useState(""); // 연령대 상태
  const [jobRange, setjobRange] = useState(""); // 직업군 상태

  // 서버에서 기존 설정 값을 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/mypage/getRecommendSetting",
          {},
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        console.log("응답받은 데이터: ", data); // 전체 응답 데이터 확인

        if (data.message === "성공") {
          if (
            Array.isArray(data.recommendFieldList) &&
            data.recommendFieldList.length > 0
          ) {
            console.log("recommendFieldList: ", data.recommendFieldList); // 확인

            const extractedFields = data.recommendFieldList.map(item => {
              const parts = item.split(">");
              return parts.length > 1 ? parts[1].trim() : item;
            });

            console.log("추출된 중분류들: ", extractedFields); // 추출된 데이터 확인

            setSelectedSubFields(
              extractedFields.map(name => {
                const field = subFields.find(field => field.name === name);
                return field
                  ? { id: field.id, name: field.name }
                  : { id: null, name };
              })
            );
          }

          if (data.interest) {
            setSelectedInterestTypes(data.interest.split(","));
          }

          if (data.ageRange) {
            setageRange(data.ageRange);
          }

          if (data.jobRange) {
            setjobRange(data.jobRange);
          }
        } else {
          // 여기에서 기존 데이터가 없을 때 별도의 alert를 띄우지 않음
          console.warn(
            "설정을 불러오는 중 문제가 발생했습니다: " + data.message
          );
        }
      } catch (error) {
        console.error("설정을 불러오는 중 오류가 발생했습니다:", error);
        alert("설 정을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, [subFields]);

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
    // 기존에 선택된 중분류 항목을 유지하고 중복 선택을 방지
    const updatedSelectedSubFields = [...selectedSubFields];

    subFieldOptions.forEach(option => {
      if (
        selectedSubFields.some(selected => selected.id === option.id) &&
        !updatedSelectedSubFields.some(selected => selected.id === option.id)
      ) {
        updatedSelectedSubFields.push(option);
      }
    });

    // 현재 선택된 대분류와 관련된 중분류만 추가하기
    setSubFields(subFieldOptions);
    setSelectedSubFields(updatedSelectedSubFields);
  };

  // 중분류 항목 선택 시 이름과 ID 값을 상태에 저장하는 함수
  const handleSubFieldClick = subField => {
    setSelectedSubFields(prev => {
      if (prev.some(selected => selected.id === subField.id)) {
        return prev.filter(selected => selected.id !== subField.id);
      } else if (prev.length < 5) {
        return [...prev, { id: subField.id, name: subField.name }];
      } else {
        alert("최대 5개까지 선택 가능합니다.");
        return prev;
      }
    });
  };

  // 관심유형 항목 선택 시 처리하는 함수
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

  // 선택된 중분류 항목을 초기화하는 함수
  const resetSelectedSubFields = () => {
    setSelectedSubFields([]);
  };

  // 선택된 관심유형 항목을 초기화하는 함수
  const resetSelectedInterestTypes = () => {
    setSelectedInterestTypes([]);
  };

  // 저장 버튼 클릭 시 데이터를 서버로 전송하는 함수
  const handleSave = async () => {
    // 선택된 중분류 ID를 쉼표로 구분된 문자열로 변환
    const selectedSubFieldIds = selectedSubFields
      .map(field => field.id)
      .join(",");
    // 선택된 관심유형을 쉼표로 구분된 문자열로 변환
    const selectedInterestTypeNames = selectedInterestTypes.join(",");

    const data = {
      recIndexes: selectedSubFieldIds, // 중분류 ID를 문자열로 전송
      interest: selectedInterestTypeNames, // 관심유형을 문자열로 전송
      ageRange,
      jobRange,
    };

    console.log("저장된 데이터들 :", {
      selectedSubFields: selectedSubFieldIds, // ID들 문자열로 변환
      selectedInterestTypes: selectedInterestTypeNames, // 관심유형들 문자열로 변환
      ageRange,
      jobRange,
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/mypage/setRecommendSetting",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("저장되었습니다: " + response.data);
    } catch (error) {
      alert("저장 중 오류가 발생했습니다: " + error.message);
    }
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
                    key={field.id}
                    onClick={() => handleSubFieldClick(field)} // 전체 field 객체를 전달
                    className={
                      selectedSubFields.some(
                        selected => selected.name === field.name
                      )
                        ? "selected"
                        : ""
                    }
                  >
                    {field.name} {/* 버튼에 표시되는 텍스트는 name */}
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
                    onClick={() => handleSubFieldClick(field)}
                  >
                    {field.name}
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
              onClick={() => handleInterestTypeClick("고전")}
              className={
                selectedInterestTypes.includes("고전") ? "selected" : ""
              }
            >
              고전
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
              <select
                className="additional-info-select"
                value={ageRange}
                onChange={e => setageRange(e.target.value)}
              >
                <option value="">선택하세요</option>
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
              <select
                className="additional-info-select"
                value={jobRange}
                onChange={e => setjobRange(e.target.value)}
              >
                <option value="">선택하세요</option>
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
      <div className="reco-submit-button" onClick={handleSave}>
        저장하기
      </div>
    </div>
  );
};

export default MyRecommend;

import React from "react";
import {
  AiFillFileText,
  AiFillHeart,
  AiFillEye,
  AiOutlineShareAlt,
  AiOutlineWarning,
} from "react-icons/ai";
import "../styles/DetailContent.css";
import SearchNav from "./SearchNav"; // SearchNav 컴포넌트 임포트

const DetailContent = () => {
  const searchKeyword = "디지털 트윈"; // 예시 키워드
  const resultCount = 123; // 예시 결과 수

  return (
    <div className="detail-background-container">
      {/* SearchNav 컴포넌트 삽입 */}
      <SearchNav searchKeyword={searchKeyword} resultCount={resultCount} />

      <div className="detail-content-container">
        <div className="detail-content-inner-container">
          <header className="detail-header">
            <div className="header-left">
              <AiFillFileText className="header-icon" />
              <span className="header-category">기술 &gt; 기계공학</span>
            </div>
            <h1 className="detail-title">
              차량용 센서세트를 활용한 디지털트윈 생성 방법 및 장치
            </h1>
            <p className="detail-subtitle">
              Method and apparatus for generating digital twin using vehicle
              sensor set
            </p>
          </header>

          <div className="detail-info-and-buttons">
            <section className="detail-info">
              <ul>
                <li>
                  저자: <span>주식회사 디지털안전기술단</span>
                </li>
                <li>
                  날짜: <span>2023-01-25</span>
                </li>
                <li>
                  발행기관: <span>특허청</span>
                </li>
                <li>
                  출처: <span>KIPRIS</span>
                </li>
                <li>
                  출원번호: <span>10-2023-0009328</span>
                </li>
                <li>
                  공개번호: <span>-</span>
                </li>
              </ul>
            </section>

            <div className="detail-buttons">
              <div className="info-buttons">
                <button>
                  <AiFillHeart /> 즐겨찾기
                </button>
                <button>
                  <AiOutlineShareAlt /> 공유하기
                </button>
              </div>

              <div className="info-stats">
                <div>
                  <AiFillEye /> 조회 2
                </div>
                <div>
                  <AiFillHeart /> 공감 0
                </div>
                <div>
                  <AiFillEye /> 방문 1
                </div>
              </div>
              <button className="report-button">
                <AiOutlineWarning /> 오류신고
              </button>
            </div>
          </div>

          <section className="detail-tags">
            <h3>주제어</h3>
            <div className="tags">
              <span>센서</span>
              <span>차량용</span>
              <span>운전자</span>
            </div>
          </section>

          <section className="detail-description">
            <h3>설명</h3>
            <p>
              본 발명은 디지털트윈의 생성 방법 및 장치에 관한 것으로서, 더욱
              상세하게는 차량용 센서세트를 활용한 아라운드 센싱 시스템을 통하여
              아라운드 가상 뷰를 생성함으로 차량의 작업환경 내에 접근하는 작업자
              등의 위험을 감지하고 이를 차량의 운전자에게 알리기 위한 차량용
              센서세트를 활용한 디지털트윈 생성 방법 및 장치에 관한 것이다.
            </p>
          </section>

          <section className="related-knowledge">
            <h3>연관 지식</h3>
            <div className="related-loading">
              <p>Loading...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailContent;

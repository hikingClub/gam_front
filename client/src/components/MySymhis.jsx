import React, { useState } from "react";
import "../styles/MySymhis.css";
import { FaStar } from "react-icons/fa";

const listItems = [
  "데이터 처리 장치 및 데이터 처리 방법",
  "데이터 신경망",
  "데이터 분석 시스템, 데이터 분석 방법 및 프로그램",
  "책 읽어주는 엄샘 책임샘",
  "데이터나운",
];

const MySymhis = () => {
  const [favorites, setFavorites] = useState(
    Array(listItems.length).fill(false)
  );

  const toggleFavorite = index => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  return (
    <div className="mysymhis-container">
      <div className="mysymhis-inner-container">
        <div className="favorites-list-title">
          <h3>공감 내역</h3>
          <hr />
        </div>
        <div className="favorites-list">
          <ul>
            {listItems.map((item, index) => (
              <li key={index} className="list-item">
                <span>{item}</span>
                <FaStar
                  className={`star-icon ${favorites[index] ? "active" : ""}`}
                  onClick={() => toggleFavorite(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MySymhis;

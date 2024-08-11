import React from "react";
import "../styles/Marquee.css";

function Marquee({ dataCounts }) {
  const todayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="marquee">
      <div className="marquee-content">
        <span className="new-data">
          <i className="fas fa-plus-circle"></i> 신규데이터{" "}
          <strong>{dataCounts.new}</strong>건
        </span>
        <span className="updated-data">
          <i className="fas fa-sync-alt"></i> 수정데이터{" "}
          <strong>{dataCounts.updated}</strong>건
        </span>
        <span className="deleted-data">
          <i className="fas fa-trash-alt"></i> 삭제데이터{" "}
          <strong>{dataCounts.deleted}</strong>건
        </span>
      </div>
      <div className="marquee-date">
        ( <i className="fas fa-clock"></i> {todayDate()} 10:00 기준 )
      </div>
    </div>
  );
}

export default Marquee;

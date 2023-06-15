import React from "react";

export default function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <div className="result">
        <span className="title">Kết quả tìm kiếm</span>
        <div className="userChat">
          <span className="name">nguyenvikhang</span>
        </div>
      </div>
    </div>
  );
}

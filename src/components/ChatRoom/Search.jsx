import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Tìm kiếm..." />
        <button className="join">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

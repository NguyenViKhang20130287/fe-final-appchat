import React from "react";

export default function addUserPopup({ setIsOpenPopup }) {
  return (
    <div className="addUserPopup">
      <div className="containerAdd">
        <form action="" className="formSearch">
          <h1 className="title">Tìm kiếm</h1>
          <input className="searchU" type="email" placeholder="Nhập email..." />
          <div className="btns">
            <button
              className="closeBtn"
              onClick={setIsOpenPopup.bind(this, false)}
            >
              Đóng
            </button>
            <button className="findBtn">Tìm kiếm</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";

export default function CreateRoom({ setIsOpenPopup }) {
  return (
    <div className="CreateRoomPopup">
      <div className="containerCreate">
        <form action="" className="formCreate">
          <h1 className="title">Tạo phòng</h1>
          <input className="createR" type="text" placeholder="Nhập email..." />
          <div className="btns">
            <button
              className="closeBtn"
              onClick={setIsOpenPopup.bind(this, false)}
            >
              Đóng
            </button>
            <button className="findBtn">Tạo</button>
          </div>
        </form>
      </div>
    </div>
  );
}

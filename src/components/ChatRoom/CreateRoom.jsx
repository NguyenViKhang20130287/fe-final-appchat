import React, { useState, useEffect } from "react";
import socket from "../../cnn/ConnectWebSocket";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchListUser } from "../../app/fetchData";
// import { createRoom } from "./Api_handle.js";

export default function CreateRoom({ setIsOpenPopup }) {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const request = {
      action: "onchat",
      data: {
        event: "CREATE_ROOM",
        data: {
          name: roomName,
        },
      },
    };

    const requestGetListRoom = {
      action: "onchat",
      data: {
        event: "GET_USER_LIST",
      },
    };

    socket.send(JSON.stringify(request));
    socket.send(JSON.stringify(requestGetListRoom));
  };

  const handleChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="CreateRoomPopup">
      <div className="containerCreate">
        <form action="" className="formCreate">
          <h1 className="title">Tạo phòng</h1>
          <input
            className="createR roomName"
            type="text"
            placeholder="Nhập email..."
            value={roomName}
            // onChange={(e) => setRoomName(e.target.value)}
            onChange={handleChange}
          />
          <div className="btns">
            <button
              id="close_popup"
              className="closeBtn"
              onClick={setIsOpenPopup.bind(this, false)}
            >
              Đóng
            </button>
            <button className="findBtn" onClick={handleCreateRoom}>
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import socket from "../../cnn/ConnectWebSocket";

export default function CreateRoom({ setIsOpenPopup }) {
  const [roomName, setRoomName] = useState("");
  // const [nameRoom, setRoomName] = useState("");

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
    // const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    // socket.onopen = () => {
    //   console.log("WebSocket connection established");

    socket.send(JSON.stringify(request));
    // };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Nhận được tin nhắn từ server:", message);

      // Kiểm tra phản hồi từ server
      if (message.status === "success") {
        console.log("Phòng chat đã được tạo thành công!");
        console.log("Thông tin phòng chat:", message.room);
        setIsOpenPopup.bind(this, false);
        // Tiếp tục xử lý với phòng chat mới được tạo
      } else {
        console.log("Không thể tạo phòng chat:", message.error);
        // Xử lý lỗi nếu cần thiết
      }
    };
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
            onChange={(e) => setRoomName(e.target.value)}
          />
          <div className="btns">
            <button
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

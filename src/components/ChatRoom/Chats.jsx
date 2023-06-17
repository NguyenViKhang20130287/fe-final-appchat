import React, { useEffect, useState, useRef } from "react";
import * as ReactDOM from 'react-dom/client';
import socket from "../../cnn/ConnectWebSocket";
// import { createRoot } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import CreateRoom from "../Functions/createRoom.js"


let roomJoinName = null
export default function Chats() {
  const joinRoom = (e) => {
    e.preventDefault();
    const requestJoin = {
      action: "onchat",
      data: {
        event: "JOIN_ROOM",
        data: {
          name: roomJoinName,
        },
      },
    };
    console.log(roomJoinName)
    if (roomJoinName !== null) {
      socket.send(JSON.stringify(requestJoin));
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // response = message
      // stored_data.push(message)
      // console.log(stored_data)
      // createRoom()
      // const roomname = JSON.parse(event.data.data);
      console.log("Nhận được tin nhắn từ server:", message);
      // console.log("RESPONSE", response)
      if (message.status === "success") {
        console.log("Phòng chat đã được tạo thành công!");
        console.log("Thông tin phòng chat:", message.data.name);
        // roomChatName = message.data.name;
        // setIsOpenPopup.bind(this, false);
      } else {
        console.log("Không thể tạo phòng chat:", message.error);

      }
    };
  }
  const scrollRef = useRef(null);
  // const createRoom = (event) => {
  //   event.preventDefault();
  //   const socket = getWebSocket();
  //   if (roomName === "" || roomName.split(" ").join("") === "") {
  //     return Swal.fire({
  //       text: "Please enter room name",
  //       icon: 'warning',
  //     })
  //   }

  //   for (let i = 0; i < stored_data.length; i++) {
  //     if (countEven % 2 === 0) {
  //       if (stored_data[i] !== stored_data[i + 1]) {
  //         // temp = stored_data[i].name
  //         roomJoinName = stored_data[i].data.name
  //         data_room.push(
  //           <div className="userChat">
  //             <span className="name">{stored_data[i].data.name}</span>
  //             <button onClick={joinRoom}><i class="fa-regular fa-arrow-right-to-bracket"></i></button>
  //             <div className="numMess">
  //               <span>{stored_data[i].data.chatData.length}</span>
  //             </div>
  //           </div>)
  //         countEven++
  //       }
  //     }
  //   }
  //   console.log("sucessfully!")
  //   console.log(roomJoinName)
  // };
  // if (numberOfRoom > 0) {
  // createRoom()
  // }
  return (
    <CreateRoom scrollRef={scrollRef}></CreateRoom>
    // <div></div>
  );

}



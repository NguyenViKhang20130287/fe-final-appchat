import React, { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom/client";
import socket from "../../cnn/ConnectWebSocket";

export default function Chats() {
  const [chatsInfo, setChatsInfo] = useState([]);

  useEffect(() => {
    const requestGetListRoom = {
      action: "onchat",
      data: {
        event: "GET_USER_LIST",
      },
    };
    socket.send(JSON.stringify(requestGetListRoom));
    // socket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   // setChatsInfo(message.data);
    //   // console.log("mess chats: ", message);
    //   if (message.event === "GET_USER_LIST") {
    //     if (message.status === "success") {
    //       setChatsInfo(message.data);
    //       // console.log("type: ", message.data[0].type);
    //       // console.log("messdata: ", chatsInfo);
    //     } else {
    //       console.log(message.error);
    //     }
    //   }
    // };

    const handleChatMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === "GET_USER_LIST" && message.status === "success") {
        setChatsInfo(message.data);
      } else {
        console.log(message.error);
      }
    };

    socket.addEventListener("message", handleChatMessage);

    return () => {
      socket.removeEventListener("message", handleChatMessage);
    };
  }, [chatsInfo]);

  //

  return (
    <div className="chats">
      {chatsInfo.map((value, index) => {
        return (
          <div key={index}>
            <div className="userChat">
              <span className="name">{value.name}</span>
            </div>
            ;
          </div>
        );
      })}
    </div>
  );
}

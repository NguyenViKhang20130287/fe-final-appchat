import React, { useContext, useEffect, useState } from "react";
import { FaPhone, FaVideo, FaArrowCircleRight } from "react-icons/fa";
import { FaPaperPlane, FaFile, FaRegSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import socket from "../../cnn/ConnectWebSocket";
import AVATAR from "../../images/avatar.png";
import Message from "./Message";
import { valueSearch } from "./Search";
import { checkUser } from "./Search";

export default function Chat() {
  const [roomName, setRoomName] = useState("");
  const [messageInfo, setMessageInfor] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const signout = () => {
    // const isValid = setValidationLoginForm();
    // if (!isValid) {
    //   return;
    // } else {
    const payload = {
      action: "onchat",
      data: {
        event: "LOGOUT",
      },
    };

    //connect to api
    // const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    // socket.onopen = () => {
    // console.log("WebSocket connection established");

    socket.send(JSON.stringify(payload));
    // };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      //check error status
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    // }
    navigate("/signout");
  };

  //
  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Nhận được tin nhắn từ server Chat:", message);

      if (message.event === "JOIN_ROOM") {
        if (message.status === "success") {
          console.log("check", message.data.name);
          setRoomName(message.data.name);
        } else {
          // checkUser();
          console.log("valueSearch Chat: ", valueSearch);
          setUsername(valueSearch);
          console.log("uname Chat: ", username);
          const requestCheckUser = {
            action: "onchat",
            data: {
              event: "CHECK_USER",
              data: {
                user: username,
              },
            },
          };
          socket.send(JSON.stringify(requestCheckUser));
          socket.onmessage = (event) => {
            const messageCheckU = JSON.parse(event.data);
            if (messageCheckU.event === "CHECK_USER") {
              console.log(
                "Nhận được tin nhắn từ server CheckU:",
                messageCheckU
              );
            }
          };
          console.log("cant find room", message.status);
        }
      }
    };
  });

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="name">
          <span>{roomName}</span>
        </div>
        <div className="functions">
          {/* <FaSearch style={{ marginRight: 25, cursor: "pointer" }} /> */}
          <FaPhone
            style={{
              marginRight: 25,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
          <FaVideo
            style={{
              marginRight: 25,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
          <FaArrowCircleRight
            onClick={signout}
            style={{
              marginRight: 0,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
        </div>
      </div>

      <div className="messages">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      <div className="inputMess">
        <div className="input">
          <div className="fileAndEmo">
            <FaFile
              style={{
                marginRight: "10px",
                color: "#f84785",
                cursor: "pointer",
              }}
            />
            <FaRegSmile style={{ color: "#f84785", cursor: "pointer" }} />
          </div>
          {/* <div className="yourMess"> */}
          <input
            className="yourMess"
            type="text"
            placeholder="Nhập tin nhắn..."
          />
          {/* </div> */}
          <button className="send">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

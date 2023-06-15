import React from "react";
import { FaPhone, FaVideo, FaArrowCircleRight } from "react-icons/fa";
import Messages from "./Messages";
import Input from "./Input";
import { useNavigate } from "react-router-dom";


export default function Chat() {
  const navigate = useNavigate();
  const signout = () => {
    // const isValid = setValidationLoginForm();
    // if (!isValid) {
    //   return;
    // } else {
    const payload = {
      action: "onchat",
      data: {
        event: "LOGOUT"
      }
    }

    //connect to api
    const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    socket.onopen = () => {
      console.log("WebSocket connection established");

      socket.send(JSON.stringify(payload));
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      //check error status
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    // }
    navigate("/signout")
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="name">
          <span>nguyenvikhang</span>
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
          <FaArrowCircleRight onClick={signout}
            style={{
              marginRight: 0,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

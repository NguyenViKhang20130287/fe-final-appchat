import React from "react";
import { FaSearch, FaPhone, FaVideo, FaArrowCircleRight } from "react-icons/fa";
import Messages from "./Messages";
import Input from "./Input";

export default function Chat() {
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
          <FaArrowCircleRight
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

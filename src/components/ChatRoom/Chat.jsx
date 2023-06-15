import React from "react";
import { FaSearch, FaPhone, FaVideo } from "react-icons/fa";
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
          <FaSearch style={{ marginRight: 25, cursor: "pointer" }} />
          <FaPhone style={{ marginRight: 25, cursor: "pointer" }} />
          <FaVideo style={{ marginRight: 0, cursor: "pointer" }} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

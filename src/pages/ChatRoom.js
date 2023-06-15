import React from "react";
import Sidebar from "../components/ChatRoom/Sidebar";
import Chat from "../components/ChatRoom/Chat";

export default function ChatRoom() {
  return (
    <div className="chatRoom">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

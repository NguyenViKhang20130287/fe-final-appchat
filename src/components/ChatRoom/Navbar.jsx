import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import CreateRoom from "./CreateRoom";
import { usernameLogin } from "../Login/Login_content";

export default function Navbar() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="navbar">
      <div className="logo">
        ChatRapid - <span className="username">{usernameLogin}</span>
      </div>
      <button className="createRoom" onClick={setIsOpenPopup.bind(this, true)}>
        <FaPlus />
      </button>
      {isOpenPopup && <CreateRoom setIsOpenPopup={setIsOpenPopup} />}
    </div>
  );
}

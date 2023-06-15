import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateRoom from "./CreateRoom";

export default function Navbar() {
  // const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">ChatRapid</div>
      <button className="createRoom">
        <FaPlus />
      </button>
      {/* <button className="addUser" onClick={setIsOpenPopup.bind(this, true)}>
        <FaPlus />
      </button>
      {isOpenPopup && <CreateRoom setIsOpenPopup={setIsOpenPopup} />} */}
    </div>
  );
}

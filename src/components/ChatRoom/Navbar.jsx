import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddUserPopup from "./addUserPopup";

export default function Navbar() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">ChatRapid</div>
      <button className="addUser" onClick={setIsOpenPopup.bind(this, true)}>
        <FaPlus />
      </button>
      {isOpenPopup && <AddUserPopup setIsOpenPopup={setIsOpenPopup} />}
    </div>
  );
}

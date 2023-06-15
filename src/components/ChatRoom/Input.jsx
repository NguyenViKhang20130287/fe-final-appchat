import React from "react";
import { FaPaperPlane, FaFile, FaRegSmile } from "react-icons/fa";

export default function Input() {
  return (
    <div className="input">
      <div className="fileAndEmo">
        <FaFile
          style={{ marginRight: "10px", color: "#f84785", cursor: "pointer" }}
        />
        <FaRegSmile style={{ color: "#f84785", cursor: "pointer" }} />
      </div>
      {/* <div className="yourMess"> */}
      <input className="yourMess" type="text" placeholder="Nhập tin nhắn..." />
      {/* </div> */}
      <button className="send">
        <FaPaperPlane />
      </button>
    </div>
  );
}

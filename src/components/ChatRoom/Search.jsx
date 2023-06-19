import React, { createContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListUser,
  fetchMesPeople,
  fetchMesRoom,
  joinRoom,
} from "../../app/fetchData";
import Swal from "sweetalert2";
import socket from "../../cnn/ConnectWebSocket";

var valueCheck = false;
var valueSearch = "";

export const checkUser = () => {
  console.log("value search: ", valueSearch);
  const requestCheckUser = {
    action: "onchat",
    data: {
      event: "CHECK_USER",
      data: {
        user: valueSearch,
      },
    },
  };
  socket.send(JSON.stringify(requestCheckUser));
  socket.onmessage = (event) => {
    const messageCheckU = JSON.parse(event.data);
    if (messageCheckU.event === "CHECK_USER") {
      console.log("Nhận được tin nhắn từ server CheckU:", messageCheckU);
    }
  };
};

const Search = () => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    console.log("checked", isChecked);
  };

  const handleValueChange = () => {};

  const handleSearch = (e) => {
    e.preventDefault();
    if (isChecked === true) {
      const request = {
        action: "onchat",
        data: {
          event: "JOIN_ROOM",
          data: {
            name: roomName,
          },
        },
      };
      socket.send(JSON.stringify(request));
    } else {
      const request = {
        action: "onchat",
        data: {
          event: "GET_PEOPLE_CHAT_MES",
          data: {
            name: roomName,
            page: 1,
          },
        },
      };
      socket.send(JSON.stringify(request));
    }

    valueSearch = roomName;
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div className="checkRoom">
          <input
            type="checkbox"
            name="checkRoom"
            id="checkRoom"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <button className="join" onClick={handleSearch}>
            <FaArrowRight />
          </button>
          {/* <label htmlFor="checkRoom">Phòng</label> */}
        </div>
      </div>
    </div>
  );
};
export default Search;
export { valueCheck, valueSearch };

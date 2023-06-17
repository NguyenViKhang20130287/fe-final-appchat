import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUser, fetchMesPeople, fetchMesRoom, joinRoom } from "../../app/thunk";
import Swal from 'sweetalert2';
import socket from "../../cnn/ConnectWebSocket";

const Search = () => {

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Tìm kiếm..." />
        <button className="join">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Search;


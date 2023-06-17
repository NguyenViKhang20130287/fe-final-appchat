import React from "react";
// import '../../src/index.css'
import Home_main from "../components/home/Home_main";
import Home_title from "../components/home/Home_title";
import { useEffect } from "react";
import { ConnectWebSocket, closeWebSocket } from "./../cnn/ConnectWebSocket";

export default function home() {
  return (
    <div className="home_site">
      <Home_title />
      <Home_main />
    </div>
  );
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../cnn/ConnectWebSocket";

export default function Login_side() {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };

  return (
    <div className="login_side">
      <i class="fa-solid fa-comments"></i>
      <h3>Đăng nhập để gửi tin nhắn nhanh chóng!</h3>
      <button onClick={login} type="submit" className="login_button">
        Đăng nhập
      </button>
    </div>
  );
}

import React from "react";
import { Link, useHistory } from "react-router-dom";
import Login_password_option from "./Login_password_option";
import Login_register from "./Login_register";
import { useEffect, useState } from "react";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "validator";
import { useNavigate } from "react-router-dom";
import socket from "../../cnn/ConnectWebSocket";

export var usernameLogin = "";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState("");
  const [validationLogin, setValidationLogin] = useState("");

  // check status
  let status;
  //link to another page
  const navigate = useNavigate();

  //validate login form
  const setValidationLoginForm = () => {
    const check = {};

    if (isEmpty(username)) {
      check.username = "Vui lòng nhập tên đăng nhập.";
    }

    if (!isEmpty(username) && username.length < 3) {
      check.username = "Tên đăng nhập không hợp lệ.";
    }

    if (isEmpty(password)) {
      check.password = "Vui lòng nhập mật khẩu.";
    }

    if (!isEmpty(password) && password.length < 6) {
      check.password = "Mật khẩu không hợp lệ.";
    }

    //check username and password match
    if (status === true) {
      check.messages = "Tài khoản hoặc mật khẩu không đúng.";
    } else if (status === false) {
      navigate("/chatroom");
    }

    setValidationLogin(check);
    if (Object.keys(check).length > 0) return false;
    return true;
  };
  //   ConnectWebSocket(handleSocketMessage);

  //   return () => {
  //     closeWebSocket();
  //   };
  // }, []);
  // const handleSocketMessage = (message) => {
  //   // Xử lý dữ liệu nhận được từ WebSocket
  //   console.log("Received message:", message);
  // };
  // const login = () => {
  //   const loginData = {
  //     action: "onchat",
  //     data: {
  //       event: "LOGIN",
  //       data: {
  //         user: username,
  //         pass: password,
  //       },
  //     },
  //   };
  //   sendWebSocketMessage(loginData);
  //   setValidationLoginForm();
  // navigate("/chatroom");
  // };

  const login = () => {
    const isValid = setValidationLoginForm();
    if (!isValid) {
      return;
    } else {
      const payload = {
        action: "onchat",
        data: {
          event: "LOGIN",
          data: {
            user: username,
            pass: password,
          },
        },
      };

      //connect to api
      // const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

      // socket.onopen = () => {
      //   console.log("WebSocket connection established");

      socket.send(JSON.stringify(payload));
      // };
      // ConnectAPI(payload);
      usernameLogin = username;
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        console.log("Received message:", event.data);
        console.log(response);
        //check error status
        let message = JSON.stringify(event.data);
        status = message.includes("error");
        // console.log(status)
        // console.log(message)
        setValidationLoginForm();
      };
    }
  };

  return (
    <div id="login_section" className="login_body">
      <h3 className="login_title">Đăng nhập</h3>
      <p className="title_sub">Chào mừng bạn đã trở lại với ChatRapid.</p>
      <label htmlFor="username_login">Tên đăng nhập</label>
      <input
        name="username"
        className="login_username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Tên đăng nhập"
        type="text"
        id="username_login"
      />
      <p className="error_login">{validationLogin.username}</p>
      <label htmlFor="password_login">Mật khẩu</label>
      <input
        name="password"
        className="login_password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        type="password"
        id="password_login"
      />
      <i className="fa-solid fa-eye"></i>
      <p className="error_login_pass">{validationLogin.password}</p>
      <Login_password_option />
      <button onClick={login} type="submit" className="login_button">
        Đăng nhập
      </button>
      <Login_register />
      <p
        onChange={(e) => setMessages(e.target.value)}
        name="messages"
        id="display_error"
        className="error_status"
      >
        {validationLogin.messages}
      </p>
    </div>
  );
};

export default LoginForm;

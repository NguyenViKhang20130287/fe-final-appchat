import React from "react";
import Register_agree_term from "./Register_agree_term";
import Register_login from "./Register_login";
import { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "validator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import socket from "../../cnn/ConnectWebSocket";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [check_term, setAgreeTerm] = useState("");
  const [validationRegister, setValidationRegister] = useState("");

  //link to another page
  const navigate = useNavigate();

  //check valid input from form
  const validateRegisterForm = () => {
    const check = {};

    if (isEmpty(username)) {
      check.username = "Vui lòng nhập tên đăng nhập.";
    }

    if (!isEmpty(username) && username.length < 3) {
      check.username = "Tên đăng nhập phải dài hơn 3 kí tự.";
    }

    if (isEmpty(password)) {
      check.password = "Vui lòng nhập mật khẩu.";
    }

    if (!isEmpty(password) && password.length < 6) {
      check.password = "Mật khẩu phải dài hơn 6 kí tự";
    }

    if (isEmpty(confirm_password)) {
      check.confirm_password = "Vui lòng xác nhận mật khẩu.";
    }

    if (!isEmpty(confirm_password) && confirm_password !== password) {
      check.confirm_password = "Mật khẩu không trùng nhau!";
    }

    if (isEmpty(check_term)) {
      check.check_term = "Vui lòng xác nhận các điều khoản.";
    }

    setValidationRegister(check);
    if (Object.keys(check).length > 0) return false;
    return true;
  };

  const register = () => {
    const isValid = validateRegisterForm();
    //check valid input
    if (!isValid) {
      return;
    } else {
      const payload = {
        action: "onchat",
        data: {
          event: "REGISTER",
          data: {
            user: username,
            pass: password,
          },
        },
      };
      //connect api
      const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

      socket.onopen = () => {
        console.log("WebSocket connection established");
        // Send the login payload as a JSON string
        socket.send(JSON.stringify(payload));
      };

      socket.onmessage = (event) => {
        console.log("Received message:", event.data);
      };

      // socket.onclose = () => {
      //   console.log("WebSocket connection closed");
      // };
      console.log(username, password);
    }
    //display success message
    Swal.fire(
      "Đăng kí tài khoản thành công!",
      "Tiếp tục đăng nhập để sử dụng ChatRapid!",
      "Ok"
    );
    navigate("/login");
  };

  return (
    <div className="register_body" autoComplete="off">
      <h3 className="register_title">Đăng ký</h3>
      <p className="register_sub">Tạo tài khoản miễn phí với ChatRapid.</p>
      <label for="username_register">Tên đăng nhập</label>
      <input
        name="username"
        className="input-error"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Tên đăng nhập"
        type="text"
        id="username_register"
      />
      <p className="error">{validationRegister.username}</p>
      <label for="password_register">Mật khẩu</label>
      <input
        name="password"
        className="input-error"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        type="password"
        id="password_register"
      />
      <i class="fa-solid fa-eye"></i>
      <p className="error_pass">{validationRegister.password}</p>
      <label id="re_confirm_password" for="re_password_register">
        Xác nhận mật khẩu
      </label>
      <input
        name="confirm_password"
        className="input-error"
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Xác nhận mật khẩu"
        type="password"
        id="re_password_register"
      />
      <i class="fa-solid fa-eye"></i>
      <p className="error_pass">{validationRegister.confirm_password}</p>
      <div className="register_term">
        <input
          onChange={(e) => setAgreeTerm(e.target.value)}
          className="term"
          type="checkbox"
          value="Đồng ý"
          id="agree_term"
          name="check_term"
        />
        <label for="check_term">Tôi đồng ý với các điều khoản</label>
      </div>
      ;<p className="error_term">{validationRegister.check_term}</p>
      <button onClick={register} type="submit" className="register_button">
        Đăng ký
      </button>
      <Register_login />
    </div>
  );
};

export default RegisterForm;

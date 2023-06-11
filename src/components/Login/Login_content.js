import React from "react";
import { Link } from "react-router-dom";
import Login_password_option from "./Login_password_option";
import Login_register from "./Login_register";

export default function Login_content() {
    return <div className="login_body">
        <h3 className="login_title">Đăng nhập</h3>
        <p className="title_sub">Chào mừng bạn đã trở lại với ChatRapid.</p>
        <label for="username_login">Tên đăng nhập</label>
        <input className="login_username" placeholder="Tên đăng nhập" type="text" id="username_login" />
        <label for="password_login">Mật khẩu</label>
        <input className="login_password" placeholder="Mật khẩu" type="password" id="password_login" />
        <i class="fa-solid fa-eye"></i>
        <Login_password_option />
        {/* <i class="fa-regular fa-eye-slash"></i> */}
        <button className="login_button">Đăng nhập</button>
        <Login_register />
    </div >;
}
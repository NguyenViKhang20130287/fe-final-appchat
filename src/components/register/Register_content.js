import React from "react";
import Register_agree_term from "./Register_agree_term";
import Register_login from "./Register_login";

export default function Register_content() {
    return <div className="register_body">
        <h3 className="register_title">Đăng ký</h3>
        <p className="register_sub">Tạo tài khoản miễn phí với ChatRapid.</p>
        <label for="username_register">Tên đăng nhập</label>
        <input className="register_username" placeholder="Tên đăng nhập" type="text" id="username_register" />
        <label for="password_register">Mật khẩu</label>
        <input className="register_password" placeholder="Mật khẩu" type="password" id="password_register" />
        <i class="fa-solid fa-eye"></i>
        <label id="re_confirm_password" for="re_password_register">Xác nhận mật khẩu</label>
        <input className="re_register_password" placeholder="Xác nhận mật khẩu" type="password" id="re_password_register" />
        <i class="fa-solid fa-eye"></i>
        <Register_agree_term />
        <button className="register_button">Đăng ký</button>
        <Register_login />
    </div>;
}
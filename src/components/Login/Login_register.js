import React from "react";
import { Link } from "react-router-dom";

export default function Login_register() {
    return <div className="login_link">
        <p>Bạn chưa có tài khoản?</p>
        <Link to="/register" className="register-link">Đăng kí ngay!</Link>
    </div>;
}
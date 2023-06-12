import React from "react";
import { Link } from "react-router-dom";

export default function Register_login() {
    return <div className="login_link">
        <p>Bạn đã có tài khoản?</p>
        <Link to="/login" className="login-link">Đăng nhập tại đây!</Link>
    </div>;
}
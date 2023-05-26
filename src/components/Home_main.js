import React from "react";
import Login from "../pages/login";
import Register from "../pages/register";
import { Link } from "react-router-dom";

export default function Home_main() {
    return <div className="home_main">
        <h2>Chào mừng bạn đến với ChatRapid</h2>
        <p>Đã có tài khoản? Đăng nhập ngay!</p>
        <Link to="/login" className="login-link">Đăng nhập</Link>
        <p>Lần đầu ở đây? Đăng kí tại đây!</p>
        <Link to="/register" className="register-link">Đăng kí</Link>
    </div>
}
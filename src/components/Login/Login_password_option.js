import React from "react";
import { Link } from "react-router-dom";

export default function Login_password_option() {
    return <div className="login_remeber">
        <input className="remember" type="checkbox" value="Nhớ mật khẩu" id="remember_password" name="check_password" />
        <label for="check_password">Nhớ mật khẩu</label>
    </div>;
}
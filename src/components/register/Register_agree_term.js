import React from "react";

export default function Register_agree_term() {
    return <div className="register_term">
        <input className="term" type="checkbox" value="Đồng ý" id="agree_term" name="check_term" />
        <label for="check_term">Tôi đồng ý với các điều khoản</label>
    </div>;
}
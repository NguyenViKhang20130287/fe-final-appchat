import React from "react";
import Login_side from "../components/Signout/Login_side";
import Thank_side from "../components/Signout/Thank_side";

export default function signout() {
    return (<div className="signout_site">
        <Thank_side />
        <Login_side />
    </div>)
}
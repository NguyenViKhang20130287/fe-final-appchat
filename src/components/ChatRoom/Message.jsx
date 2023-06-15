import React from "react";
import Avatar from "../../images/avatar.png";

export default function Message() {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <div className="avatar">
          <img
            src={Avatar}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="messageContent">
        <div className="content">
          <p>ashdoiassdaishdasldhasldkashdasldhsaldhsaldhl</p>
        </div>
        <div className="nameAndTime">
          <span className="name">nguyenvikhang</span>
          <span> - </span>
          <span className="time">01/01/2023, 12:00 AM</span>
        </div>
      </div>
    </div>
  );
}

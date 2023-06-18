import React, { useContext, useEffect, useState } from "react";
import { FaPhone, FaVideo, FaArrowCircleRight } from "react-icons/fa";
import { FaPaperPlane, FaFile, FaRegSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import socket from "../../cnn/ConnectWebSocket";
import AVATAR from "../../images/avatar.png";
import { usernameLogin } from "../Login/Login_content";
import { checkUser } from "./Search";
// import Message from "./Message";
// import { valueSearch } from "./Search";
// import { checkUser } from "./Search";

export default function Chat() {
  const [roomName, setRoomName] = useState("");
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [messageOwner, setMessageOwner] = useState([]);
  const [messageOther, setMessageOther] = useState([]);
  const [checkU, setIsCheckU] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [nameOwner, setNameOwner] = useState("");
  const navigate = useNavigate();

  const signout = () => {
    // const isValid = setValidationLoginForm();
    // if (!isValid) {
    //   return;
    // } else {
    const payload = {
      action: "onchat",
      data: {
        event: "LOGOUT",
      },
    };

    //connect to api
    // const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    // socket.onopen = () => {
    // console.log("WebSocket connection established");

    socket.send(JSON.stringify(payload));
    // };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      //check error status
    };

    // socket.onclose = () => {
    //   console.log("WebSocket connection closed");
    // };
    // }
    navigate("/signout");
  };

  //
  const checkUer = (username) => {
    setIsCheckU(username !== usernameLogin);
    // console.log("checku: ", checkU);
  };
  // checkUer("nguyenvikhang");
  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Nhận được tin nhắn từ server Chat:", message);
      if (message.event === "JOIN_ROOM") {
        if (message.status === "success") {
          setRoomName(message.data.name);
          // const nameOwner = message.data.chatData[].name
          // const newMessOwner = message.data.chatData[0].mes;
          // console.log("new mess: ", newMessOwner);
          setMessagesInfo(message.data.chatData.reverse());
          // setMessagesInfo(messagesInfo.reverse());
          // console.log("messInfo: ", messagesInfo.reverse());
          // setMessagesInfo(messagesInfo.reverse())

          // //
          // setMessageOwner(
          //   messagesInfo.filter((item) => item.name === usernameLogin)
          // );
          // setMessageOwner(messageOwner.reverse());
          // console.log("MessOwner: ", messageOwner);

          // //
          // setMessageOther(
          //   messagesInfo.filter((item) => item.name !== usernameLogin)
          // );
          // setMessageOwner(messageOther.reverse());
          // console.log("MessOther: ", messageOther);

          // console.log("JOINROOM: ", message.data.chatData);
        } else {
        }
      }
      if (message.event === "CHECK_USER") {
        if (message.status === "success") {
          console.log("CHECKUSER: ", message);
        }
      }
    };
  });
  //
  // useEffect(() => {
  //   socket.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     console.log("Nhận được tin nhắn từ server Chat:", message);

  //     if (message.event === "JOIN_ROOM") {
  //       if (message.status === "success") {
  //         console.log("check", message.data.name);
  //         setRoomName(message.data.name);
  //       } else {
  //         // checkUser();
  //         console.log("Join mess", message.mes);
  //         console.log("valueSearch Chat: ", valueSearch);
  //         setUsername(valueSearch);
  //         console.log("uname Chat: ", username);
  //         const requestCheckUser = {
  //           action: "onchat",
  //           data: {
  //             event: "CHECK_USER",
  //             data: {
  //               user: username,
  //             },
  //           },
  //         };
  //         socket.send(JSON.stringify(requestCheckUser));
  //         socket.onmessage = (event) => {
  //           const messageCheckU = JSON.parse(event.data);
  //           if (messageCheckU.event === "CHECK_USER") {
  //             console.log(
  //               "Nhận được tin nhắn từ server CheckU:",
  //               messageCheckU
  //             );
  //           }
  //         };
  //         // console.log("cant find room", message.status);
  //       }
  //     }
  //   };
  // });

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="name">
          <span>{roomName}</span>
        </div>
        <div className="functions">
          {/* <FaSearch style={{ marginRight: 25, cursor: "pointer" }} /> */}
          <FaPhone
            style={{
              marginRight: 25,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
          <FaVideo
            style={{
              marginRight: 25,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
          <FaArrowCircleRight
            onClick={signout}
            style={{
              marginRight: 0,
              cursor: "pointer",
              fontSize: "18px",
              color: "#f84785",
            }}
          />
        </div>
      </div>
      <div className="messages">
        {messagesInfo.map((value, index) => (
          <div key={index}>
            <div className="message owner">
              <div className="mainMess">
                <div className="messageInfo">
                  <div className="avatar">
                    <img
                      src={AVATAR}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="messageContent">
                  <div className="content">
                    <p>{value.mes}</p>
                  </div>
                </div>
              </div>
              <div
                className="nameAndTime"
                style={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <span className="name">{value.name}</span>
                <span> - </span>
                <span className="time" style={{}}>
                  {value.createAt}
                </span>
              </div>
            </div>
            {/*  */}
            <div className="message">
              <div className="mainMess">
                <div className="messageInfo">
                  <div className="avatar">
                    <img
                      src={AVATAR}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="messageContent">
                  <div className="content">
                    <p>aasd</p>
                  </div>
                </div>
              </div>
              <div className="nameAndTime" style={{ fontSize: "12px" }}>
                <span className="name">nguyenvikhang</span>
                <span> - </span>
                <span className="time" style={{}}>
                  01/01/2023, 12:00 AM
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inputMess">
        <div className="input">
          <div className="fileAndEmo">
            <FaFile
              style={{
                marginRight: "10px",
                color: "#f84785",
                cursor: "pointer",
              }}
            />
            <FaRegSmile style={{ color: "#f84785", cursor: "pointer" }} />
          </div>
          {/* <div className="yourMess"> */}
          <input
            className="yourMess"
            type="text"
            placeholder="Nhập tin nhắn..."
          />
          {/* </div> */}
          <button className="send">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

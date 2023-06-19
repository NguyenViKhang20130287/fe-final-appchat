import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPhone, FaVideo, FaArrowCircleRight } from "react-icons/fa";
import { FaPaperPlane, FaFile, FaRegSmile } from "react-icons/fa";
import { json, useNavigate } from "react-router-dom";
import socket from "../../cnn/ConnectWebSocket";
import AVATAR from "../../images/avatar.png";
import { usernameLogin } from "../Login/Login_content";
import { checkUser } from "./Search";
import Swal from "sweetalert2";
// import Message from "./Message";
// import { valueSearch } from "./Search";
// import { checkUser } from "./Search";

export default function Chat() {
  const [roomName, setRoomName] = useState("");
  const [peopleName, setPeopleName] = useState("");
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [message, setMessage] = useState("");
  const [userRoom, setUserRoom] = useState([]);
  const [people, setPeople] = useState([]);
  const [isCheckType, setIsCheckType] = useState("");
  const navigate = useNavigate();

  var listUser = [];
  var type = 0;

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
    Swal.fire({
      title: "Bạn có muốn đăng xuất khỏi ChatRapid?",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
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
        Swal.fire("Đăng xuất thành công!", "", "success");
      }
    });
  };

  //
  const checkUserName = (username) => {
    return username !== usernameLogin;
  };

  //
  //
  const handleSendMessToRoom = (e) => {
    e.preventDefault();
    console.log("oke");
    const requestSendMessToRoom = {
      action: "onchat",
      data: {
        event: "SEND_CHAT",
        data: {
          type: "room",
          to: roomName,
          mes: message,
        },
      },
    };
    const requestSendMessToUser = {
      action: "onchat",
      data: {
        event: "SEND_CHAT",
        data: {
          type: "people",
          to: peopleName,
          mes: message,
        },
      },
    };

    if (isCheckType === 1) {
      socket.send(JSON.stringify(requestSendMessToRoom));
      setMessage("");
      getMess();
    } else if (isCheckType === 0) {
      socket.send(JSON.stringify(requestSendMessToUser));
      setMessage("");
      getMessPeople();
    }
  };
  // checkUer("nguyenvikhang");
  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Nhận được tin nhắn từ server Chat:", message);
      //
      if (message.event === "JOIN_ROOM") {
        setIsCheckType(1);

        if (message.status === "success") {
          setRoomName(message.data.name);
          setMessagesInfo(message.data.chatData.reverse());
          // console.log(messagesInfo);
        } else if (message.status === "error") {
          setRoomName("");
          setMessagesInfo([]);
          alert("Phòng không tồn tại !!!");
        }
      }
      //
      if (message.event === "GET_PEOPLE_CHAT_MES") {
        console.log("Nhận được tin nhắn từ server Chat:", message);
        setIsCheckType(0);

        if (message.status === "success") {
          if (message.data.length > 0) {
            console.log("mess people: ", message.data);
            setPeople(message.data.reverse());
            setRoomName(message.data[0].to);
            setPeopleName(message.data[0].to);
            console.log(people.length);
          } else if (message.data.length === 0) {
            setRoomName("");
            setPeople([]);
            alert("Không tìm thấy người dùng !!!");
          }

          // people.forEach((p, index) => {
          //   console.log("people: ", p);
          //   setIsUser(people.type);
          //   console.log("ispeople: ", isUser);
          // });
        }
      }

      //
    };
    console.log("type get: ", type);
  }, []);

  //
  useEffect(() => {
    scrollEnd();
  }, [messagesInfo]);

  useEffect(() => {
    scrollEnd();
  }, [people]);

  //
  const scrollRef = useRef(null);
  const scrollEnd = () => {
    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  };

  //
  const getMess = () => {
    const request = {
      action: "onchat",
      data: {
        event: "JOIN_ROOM",
        data: {
          name: roomName,
        },
      },
    };
    socket.send(JSON.stringify(request));
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // const message = JSON.parse(event.data);
      setMessagesInfo(message.data.chatData.reverse());
    };
  };

  //
  const getMessPeople = () => {
    const requestSendMessToUser = {
      action: "onchat",
      data: {
        event: "GET_PEOPLE_CHAT_MES",
        data: {
          name: peopleName,
          page: 1,
        },
      },
    };
    socket.send(JSON.stringify(requestSendMessToUser));
    socket.onmessage = (event) => {
      const messageP = JSON.parse(event.data);

      // const message = JSON.parse(event.data);
      setPeople(messageP.data.reverse());
    };
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="name">
          <span>{roomName}</span>
        </div>
        <div className="functions">
          {/* <FaSearch style={{ marginRight: 25, cursor: "pointer" }} /> */}
          {/* <FaPhone
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
          /> */}
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
      <div className="messages" ref={scrollRef}>
        {isCheckType === 1 &&
          messagesInfo.map((value, index) => {
            return (
              <div key={index}>
                {value.name === usernameLogin ? (
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
                      <span className="time" style={{}}>
                        {value.createAt}
                      </span>
                      <span> - </span>
                      <span className="name">{value.name}</span>
                    </div>
                  </div>
                ) : (
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
                          <p>{value.mes}</p>
                        </div>
                      </div>
                    </div>
                    <div className="nameAndTime" style={{ fontSize: "12px" }}>
                      <span className="name">{value.name}</span>
                      <span> - </span>
                      <span className="time" style={{}}>
                        {value.createAt}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        {isCheckType === 0 &&
          people.map((value, index1) => {
            return (
              <div key={index1}>
                {value.name === usernameLogin ? (
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
                      <span className="time" style={{}}>
                        {value.createAt}
                      </span>
                      <span> - </span>
                      <span className="name">{value.name}</span>
                    </div>
                  </div>
                ) : (
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
                          <p>{value.mes}</p>
                        </div>
                      </div>
                    </div>
                    <div className="nameAndTime" style={{ fontSize: "12px" }}>
                      <span className="name">{value.name}</span>
                      <span> - </span>
                      <span className="time" style={{}}>
                        {value.createAt}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
            value={message}
            onChange={(e) => setMessage(e.target.value.trim())}
          />
          {/* </div> */}
          <button className="send" onClick={handleSendMessToRoom}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

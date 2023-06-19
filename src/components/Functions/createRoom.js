import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../cnn/ConnectWebSocket";
import { fetchListUser } from "../../app/fetchData";

const CreateRoom = ({ scrollRef }) => {
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState(null);
  const { listUser, toUser, listNewUser } = useSelector((state) => state.chat);
  const [newListUser, setNewListUser] = useState([]);
  const [isLogined, setIsLogged] = useState(false);

  dispatch(fetchListUser(socket));

  //   socket.onmessage = async (event) => {
  //     await dispatch(fetchListUser(socket));
  //   };

  useEffect(() => {
    if (Array.isArray(listUser)) {
      setNewListUser([...listUser]);
    }
  }, [listUser]);
  useEffect(() => {
    socket.onmessage = async (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      if (!isLogined) {
        console.log("res trong useEff", response);
        // await dispatch(fetchListUser(socket));
        setIsLogged(true);
      }
      if (response.event === "SEND_CHAT") {
        console.log("res.data", response.data);
        setNewListUser((prevListMes) => [...prevListMes, response.data]);
      }
    };
  }, [socket]);

  return (
    <div id="chatBar" className="chats">
      {newListUser?.map((item, index) => {
        return (
          <div
            key={index}
            className={`userChat ${
              activeUser === item.name || toUser?.nameUserChat === item.name
                ? "active"
                : ""
            }`}
          >
            <span className="name">{item.name}</span>
            <div className="numMess">
              <span></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateRoom;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../cnn/ConnectWebSocket";
import { fetchListUser, fetchMesPeople, fetchMesRoom } from "../../app/thunk";

const CreateRoom = ({ scrollRef }) => {
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState(null);
    const [isUserChecked, setIsUserChecked] = useState(false);
    const { listUser, toUser, listNewUser } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    const [newListUser, setNewListUser] = useState([]);
    const [cloneListUser, setCloneListUser] = useState([]);

    const [isLogined, setIsLogged] = useState(false);
    const [isOnline, setIsOnline] = useState(false);


    useEffect(() => {
        if (Array.isArray(listUser)) {

            setNewListUser([...listUser])
        }

    }, [listUser]);
    useEffect(() => {

        socket.onmessage = async (evt) => {
            const res = JSON.parse(evt.data);
            console.log(res);
            if (!isLogined) {
                console.log("res trong useEff", res);
                // await dispatch(fetchListUser(socket));
                setIsLogged(true);
            }
            if (res.event === "SEND_CHAT") {
                console.log("res.data", res.data);
                setNewListUser((prevListMes) => [...prevListMes, res.data]);
            }
        };
    }, [socket]);

    useEffect(() => {

        const cloneNew = newListUser.reduce((acc, item) => {
            const existingItem = acc.find((elem) => elem.name === item.name);
            if (!existingItem) {
                acc.push(item);
            }
            return acc;
        }, []);

        const uniqueArrA = listNewUser.reduce((acc, item) => {
            const existingItem = acc.find((elem) => elem.name === item.name);
            if (!existingItem) {
                acc.push(item);
            }
            return acc;
        }, []);

        setNewListUser((prevArrA) => prevArrA.concat(uniqueArrA))

    }, [listNewUser, listUser])
    // console.log("sucess")

    useEffect(() => {

        const apiData = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            socket.send(JSON.stringify(apiData));
        }

        socket.onmessage = (event) => {
            const res = JSON.parse(event.data);
            dispatch({
                type: "USERLIST",
                payload: res.data
            })
        };

        return () => {

        };
    }, []);


    // const handleScrollToBottom = () => {
    //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // };


    const handleChat = async (username, type) => {
        // const socket = getWebSocket();
        await dispatch({
            type: "TO_USER1",
            payload: {
                nameChatUser: username,
                isRoom: type,
            },
        });
        if (type === 1) {
            await dispatch(fetchMesRoom(socket, username));
            // handleScrollToBottom();
        } else {
            await dispatch(fetchMesPeople(socket, username));

            // handleScrollToBottom();
        }
        setActiveUser(username);
    };


    return (
        <div id="chatBar" className="chats">
            {newListUser?.map((item, index) => {
                return (
                    <div onClick={() => handleChat(item.name, item.type)} className="userChat">
                        <span className="name">{item.name}</span>
                        <button><i class="fa-regular fa-arrow-right-to-bracket"></i></button>
                        <div className="numMess">
                            <span>1</span>
                        </div>
                    </div>
                );
            })}
        </div>

    );
};

export default CreateRoom;
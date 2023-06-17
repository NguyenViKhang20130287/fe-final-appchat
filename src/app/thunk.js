// import socket from "../../cnn/ConnectWebSocket";
export const fetchMesPeople = (socket, userOrther) => (dispatch) => {
    let currentSender = null; // Biến lưu trữ người gửi hiện tại

    const handleNewMessage = (res) => {
        // Kiểm tra nếu tin nhắn mới nhận là từ người gửi hiện tại
        if (res.data.name === currentSender) {
            dispatch({
                type: "LIST_MES_PEOPLE",
                payload: res.data,
            });
        }
    };

    const getMesPeople = {
        action: "onchat",
        data: {
            event: "GET_PEOPLE_CHAT_MES",
            data: {
                name: userOrther,
                page: 1,
            },
        },
    };

    socket.send(JSON.stringify(getMesPeople));

    socket.onmessage = (evt) => {
        const res = JSON.parse(evt.data);
        console.log(res);
        dispatch({
            type: "LIST_MES_PEOPLE",
            payload: res.data,
        });

        if (res.event === "SEND_CHAT") {
            console.log("send chat", res.data);
            currentSender = res.data.name; // Cập nhật người gửi hiện tại

            const getMesPeople = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: userOrther,
                        page: 1,
                    },
                },
            };

            socket.send(JSON.stringify(getMesPeople));
        }

        handleNewMessage(res);
    };
};


export const fetchMesRoom = (socket, userOrther) => (dispatch) => {
    let currentSender = null;

    const handleNewMessage = (res) => {
        // Kiểm tra nếu tin nhắn mới nhận là từ người gửi hiện tại
        if (res?.data?.name === currentSender) {
            dispatch({
                type: "LIST_MES_ROOM",
                payload: res.data,
            });
        }
    };
    const getMesPeople = {
        action: "onchat",
        data: {
            event: "GET_ROOM_CHAT_MES",
            data: {
                name: userOrther,
                page: 1,
            },
        },
    };
    socket.send(JSON.stringify(getMesPeople));
    socket.onmessage = (evt) => {
        const res = JSON.parse(evt.data);
        console.log(res);
        dispatch({
            type: "LIST_MES_ROOM",
            payload: res.data,
        });
        if (res.event === "SEND_CHAT") {
            console.log("send chat gr", res);

            currentSender = res.data.name;
            const getMesPeople = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: userOrther,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(getMesPeople));

        }
        handleNewMessage(res);
    };

};

export const fetchListUser = (socket) => async (dispatch) => {
    let currentSender = null; // Biến lưu trữ người gửi hiện tại
    //
    const handleNewListUser = (res) => {
        // Kiểm tra nếu tin nhắn mới nhận là từ người gửi hiện tại
        if (res.data.name === currentSender) {
            dispatch({
                type: "USERLIST",
                payload: res.data,
            });
        }
    };
    const getUserListRequest = {
        action: "onchat",
        data: {
            event: "GET_USER_LIST",
        },
    };

    socket.send(JSON.stringify(getUserListRequest));

    socket.onmessage = async (evt) => {
        const res = JSON.parse(evt.data);
        await dispatch({
            type: "USERLIST",
            payload: res.data,
        });

        if (res.event === "SEND_CHAT") {
            currentSender = res.data.name; // Cập nhật người gửi hiện tại
            // console.log(currentSender);
            dispatch({
                type: "LISTNEWUSER",
                payload: res.data
            })
            const getListUser = {
                action: "onchat",
                data: {
                    event: "GET_USER_LIST",
                },
            };

            socket.send(JSON.stringify(getListUser));
        }

        handleNewListUser(res);

    };
};

export const joinRoom = (socket, userOrther) => (dispatch) => {

    const joinRoom = {
        action: "onchat",
        data: {
            event: "JOIN_ROOM",
            data: {
                name: userOrther,
            },
        },
    };

    socket.send(JSON.stringify(joinRoom));
    socket.onmessage = (evt) => {
        const res = JSON.parse(evt.data);
        dispatch({
            type: "LIST_MES_ROOM",
            payload: res.data,
        });
    };
};

export const relogin = (socket, user, code) => (dispatch) => {
    const reloginObj = {
        action: "onchat",
        data: {
            event: "RE_LOGIN",
            data: {
                user,
                code
            }
        }

    }
    socket.send(JSON.stringify(reloginObj));
    socket.onmessage = (evt) => {
        const res = JSON.parse(evt.data);

    };

}


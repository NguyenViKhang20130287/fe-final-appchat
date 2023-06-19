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
        payload: res.data,
      });
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

import { produce } from "immer";
const initialState = {
  listUser: [],
  listMesPeople: [],
  listMesRoom: null,
  toUser: null,
  listNewUser: [],
};

export const chatReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === "USERLIST") {
      draft.listUser = payload;
    }
    if (type === "TO_USER1") {
      console.log(payload);
      draft.toUser = {
        nameUserChat: payload.nameChatUser,
        isRoom: payload.isRoom,
      };
    }
    if (type === "LISTNEWUSER") {
      console.log(state);
      console.log(payload);
      draft.listNewUser.push(payload);
    }
  });
};

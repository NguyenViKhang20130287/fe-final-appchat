import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from "../reducer/chatReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  chat: chatReducer,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

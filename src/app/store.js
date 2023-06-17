import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { chatReducer } from '../reducer/chatReducer';
import { authReducer } from '../reducer/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    auth: authReducer,
    chat: chatReducer
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
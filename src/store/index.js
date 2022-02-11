
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { profileReducer } from './profile/reducer'
import { chatListReducer } from './chatList/reducer'
import { messagesReducer } from './messages/reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export const store = createStore(
    combineReducers({
        chatList: chatListReducer,
        profile: profileReducer,
        messages: messagesReducer,
    }),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(applyMiddleware(thunk))
);

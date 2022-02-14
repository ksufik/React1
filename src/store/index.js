
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { profileReducer } from './profile/reducer'
import { chatListReducer } from './chatList/reducer'
import { messagesReducer } from './messages/reducer'
import { persistStore, persistReducer } from 'redux-persist'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const config = {
    key: 'MessengerWithReact',
    storage,
    blacklist: [],
}

const persistedReducer = persistReducer(
    config,
    combineReducers({
        chatList: chatListReducer,
        profile: profileReducer,
        messages: messagesReducer,
    })
)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);

// export const store = createStore(
//     combineReducers({
//         chatList: chatListReducer,
//         profile: profileReducer,
//         messages: messagesReducer,
//     }),
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     composeEnhancers(applyMiddleware(thunk))
// );

import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { commentReducer } from './modules/comments/commentReducer'
import { postReducer } from './modules/posts/postReducer'
import { userReducer } from './modules/users/userReducer'
import { friendWallReducer } from './modules/friendWall/friendWallReducer'
import { friendsReducer } from './modules/friends/friendsReducer'
import { wallReducer } from './modules/myWall/wallReducer'

//store entities from the database
export const entitiesReducer = combineReducers({
    users : userReducer,
    posts : postReducer,
    comments : commentReducer
})

//store all the elements of UI (only ids)
export const uiReducer = combineReducers({
    friends : friendsReducer,
    friendWall : friendWallReducer,
    wall : wallReducer
})

//2 higher-level reducers
export const rootReducer = combineReducers({
    entities : entitiesReducer,
    ui : uiReducer
})

export const store = createStore (rootReducer, composeWithDevTools())
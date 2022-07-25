import {FriendWallActionTypes} from './friendWallActions'
import { combineReducers } from 'redux';


export function postIdsByIdReducer (state = [], action){
    switch(action.type){
        case FriendWallActionTypes.LOAD_POSTS :{
            const { postIds, userId } = action.payload
            
            //postIdsById: { userId: [postIds] }
            return {
                ...state,
                [userId] : state[userId] ?
                    [...state[userId], ...postIds] : [...postIds]

            }
        }
    }
    return state;
}

export const friendWallReducer = combineReducers({
    postIds : postIdsReducer
})
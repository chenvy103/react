import {FriendWallActionTypes} from './friendWallActions'
import { combineReducers } from 'redux';


export function postIdsByIdReducer (state = [], action){
    switch(action.type){
        case FriendWallActionTypes.LOAD_POSTS :{
            const { postIds, userId } = action.payload
            
            //postIdsById: { userId: [postIds] }
            return {
                [userId] : [...postIds] 
            }
        }
    }
    return state;
}

export const friendWallReducer = combineReducers({
    postIds : postIdsByIdReducer
})
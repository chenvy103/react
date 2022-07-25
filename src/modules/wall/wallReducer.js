import {WallActionTypes} from './wallActions'
import { combineReducers } from 'redux';

//just index to post-entites belong user
export function postIdsReducer (state = [], action){
    switch(action.type){
        case WallActionTypes.LOAD_POSTS :{
            //action.payload = {postIds: number[]}
            const postIds = action.payload.postIds

            //postIds: [ postIds ]
            //return [...state, ...postIds]
            return [...postIds]
        }
    }
    return state;
}

export const wallReducer = combineReducers({
    postIds : postIdsReducer
})
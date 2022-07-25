import {CommentActionTypes} from '../comments/commentActions'
import { combineReducers } from 'redux';

export function commentByIdReducer  (state = {}, action){
    switch(action.type) {
        case CommentActionTypes.LOAD_COMMENTS :{
            const comments = action.payload
            const loadedCommentsMap = comments.reduce(
                (map, comment) => ({ ...map, [comment.id]: comment }), 
            {})

            //byId : { i : {comment} }
            return {
                ...state,
                ...loadedCommentsMap
            }
        }
    }
    return state;
}


export const commentReducer = combineReducers({
    byId : commentByIdReducer
})
import {PostActionTypes} from './postActions'
import {CommentActionTypes} from '../comments/commentActions'
import { combineReducers } from 'redux';

export function postByIdReducer (state = {}, action){
    switch(action.type) {
        case PostActionTypes.LOAD_POSTS :{
            const posts = action.payload
            const loadedPostsMap = posts.reduce(
                (map, post) => ({ ...map, [post.id]: post }), 
            {})

            //byId: { i : {post} }
            return {
                ...state,
                ...loadedPostsMap
            }
        }
    }
    return state;
}

export function commentIdsByIdReducer (state = {}, action){
    switch(action.type) {
        case CommentActionTypes.LOAD_COMMENTS :{
            const { comments, postId } = action.payload
            const loadedCommentIdsByPostIdMap  = comments.reduce(
                (map, comment) => ({
                    ...map,
                    [comment.postId] : map[comment.postId] ? 
                        [...map[comment.postId], comment.id] : [comment.id]
                }), {}
            )
            if (comments.length === 0){
                loadedCommentIdsByPostIdMap = { [postId] : [] }
            }

            //commentIdsById: { postId: [commentIds] }
            return {
                ...state,
                ...loadedCommentIdsByPostIdMap
            }
        }
    }
    return state;
}

export const postReducer = combineReducers({
    byId : postByIdReducer,
    commentIdsById : commentIdsByIdReducer
})
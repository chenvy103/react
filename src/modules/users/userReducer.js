import {UserActionTypes} from './userActions'
import {PostActionTypes} from '../posts/postActions'
import { combineReducers } from 'redux';


export function userByIdReducer (state = {}, action){
    switch (action.type) {
        case UserActionTypes.LOAD_USER :{
            const user = action.payload
            return {
                ...state,
                [user.id] : user
            }
        }

        case UserActionTypes.LOAD_USERS :{
            //action.payload = users: User[]
            const users = action.payload.users
/**
 * Store a map of users by id
 * arr.reduce(callback(accumulator, currentValue,[//]) {...}, [initValue] )
 * passing array => final result = a single value 
 * Return the sum of all the elements in an array
 */
            const loadedUsersMap = users.reduce(
                (map, user) => ({ ...map, [user.id]: user }), {}
            ) 
                
            //byId: { i : {user}, i : {user}, ... }
            return{
                ...state,
                ...loadedUsersMap
            }
        }
    }
    return state;
}

export function postIdsByIdReducer (state = {}, action){
    switch (action.type) {
        case PostActionTypes.LOAD_POSTS :{
            const { posts, userId } = action.payload

            //store a map of postIds related to a user
            const loadedPostIdsByUserIdMap = posts.reduce(
                (map, post) => ({
                    ...map,
                    [post.userId] : map[post.userId] ? 
                        [...map[post.userId], post.id] : [post.id]
                }), {}
            )
            if (posts.length === 0){
                loadedPostIdsByUserIdMap = { [userId] : [] }
            }

            //postIdsById: { userId : [postIds] }
            return {
                ...state,
                ...loadedPostIdsByUserIdMap
            }
        }
    }
    return state;
}

export const userReducer = combineReducers({
    byId : userByIdReducer,
    postIdsById : postIdsByIdReducer // one-to-many relation (1:N)
})
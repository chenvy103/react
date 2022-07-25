import {FriendsActionTypes} from './friendsActions'
import { combineReducers } from 'redux';

export const orderFilterState = 'asc' || 'desc'

//just point to user-entities
export function userIdsReducer (state = [], action){
    switch(action.type){
        case FriendsActionTypes.LOAD_FRIENDS :{
            //action.payload = {userIds: number[]}
            const userIds = action.payload.userIds

            //userIds: [ userIds ] -> Friends's ids
            return [...userIds]
        }

        case FriendsActionTypes.SET_FRIENDS_ORDER :{
            return []
        }
    }
    return state;
}

export function orderFilterReducer (state = orderFilterState, action){
    switch(action.type){
        case FriendsActionTypes.SET_FRIENDS_ORDER :{
            const order = action.payload

            //orderFilter: "asc" || "desc"
            return order
        }
    }
    return state;
}

export const friendsReducer = combineReducers({
    orderFilter : orderFilterReducer,
    userIds : userIdsReducer
})
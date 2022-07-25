export const FriendsActionTypes = {
    LOAD_FRIENDS : 'friends/loadFriends',
    SET_FRIENDS_ORDER : 'friends/setFriendsOrder'
}

export const loadFriendsAction = (userIds = []) =>({
    type : FriendsActionTypes.LOAD_FRIENDS,
    payload : userIds
})

export const setFriendsOrderAction = (orderType) =>({
    type : FriendsActionTypes.SET_FRIENDS_ORDER,
    payload : orderType // (asc || desc)
})

export const friendsActions = {
    loadFriendsAction,
    setFriendsOrderAction
}
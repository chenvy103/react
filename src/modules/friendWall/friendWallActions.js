export const FriendWallActionTypes = {
    LOAD_POSTS : 'friendWall/loadPosts'
}

export const loadFriendWallPostsAction = (postIds = []) =>({
    type : FriendWallActionTypes.LOAD_POSTS,
    payload : postIds
})

export const friendWallActions = {
    loadFriendWallPostsAction,
}
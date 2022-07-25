export const WallActionTypes = {
    LOAD_POSTS : 'wall/loadPosts'
}

export const loadWallPostsAction = (postIds = []) =>({
    type : WallActionTypes.LOAD_POSTS,
    payload : postIds
})

export const wallActions = {
    loadWallPostsAction,
}
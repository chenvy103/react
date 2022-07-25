

export const PostActionTypes = {
    LOAD_POSTS : 'post/loadPosts'
}

//optional param: userId == undefined ? My Wall : FriendWall(friendId-userId)
export const loadPostsAction = ({posts = [], userId}) => ({
    type: PostActionTypes.LOAD_POSTS, 
    payload: {posts, userId} 
})

export const postActions = {
    loadPostsAction
}
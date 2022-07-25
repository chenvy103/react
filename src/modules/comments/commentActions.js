

export const CommentActionTypes = {
    LOAD_COMMENTS : 'comment/loadComments'
}

export const loadCommentsAction = ({comments = [], postId}) => ({
    type: CommentActionTypes.LOAD_COMMENTS, 
    payload: {comments, postId} 
})

export const commentActions = {
    loadCommentsAction
}


export const UserActionTypes = {
    LOAD_USER : 'user/loadUser',
    LOAD_USERS : 'user/loadUsers'
}

//load a single user => My Wall / Friend Wall
export const loadUserAction = (user) => ({
    type: UserActionTypes.LOAD_USER, 
    payload: user 
})

//load all users into the store => My Friends Page
export const loadUsersAction = (users = []) => ({
    type: UserActionTypes.LOAD_USERS, 
    payload: users
})

export const userActions = {
    loadUserAction,
    loadUsersAction
}
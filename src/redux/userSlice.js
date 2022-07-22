import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getCurrentUser} from '../features/UserService'

const initialState={
    userInfo: {}
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async()=>{
        try{
            const data = await getCurrentUser()
            return data
        } catch(error){
            console.log('error', error)
                return error
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state){
            state.userInfo = {}
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getUser.fulfilled, (state, action)=>{
                if (action.payload!== null){
                    const data = action.payload.data
                    console.log('user',data)
                    state.userInfo = data
                } else console.log('not logged in')
            })
    }
})

const { actions, reducer } = userSlice
export const { logoutUser } = actions

export default reducer


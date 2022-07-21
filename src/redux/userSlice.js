import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { baseURL } from '../features/fetchAPI';
import { getLocalStorageItem } from '../features/LocalStorageService';

const initialState={
    userInfo: {}
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async()=>{
        try{
            const token = getLocalStorageItem('accessToken')
            const res = await fetch(`${baseURL}/me`,{
                method: 'get',
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            });
            return await res.json();
    
        } catch(error) {
            console.log('error', error)
            return error
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(getUser.fulfilled, (state, action)=>{
                const data = action.payload.data
                console.log('user',data)
                state.userInfo = data
            })
    }
})

export default userSlice.reducer


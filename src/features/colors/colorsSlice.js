import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'

const colorsAdapter = createEntityAdapter()
const initialState = colorsAdapter.getInitialState({
    status: 'idle'
})



export const getColors = createAsyncThunk(
    'colors/getColors',
    async()=>{
        try{
            const res = await axios.get(`http://127.0.0.1/api/colors`)
            console.log(res);
            return res.data
        }catch (err){
            console.error(err);
        }
    }
)

const colorsSlice = createSlice({
    name: 'colors',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getColors.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getColors.fulfilled, (state, action) =>{
            colorsAdapter.setAll(state, action.payload.data)
            state.status = 'idle'
        })
        .addCase(getColors.rejected, (state) => {
            state.status = 'failed'
            colorsAdapter.removeAll(state)
        })
    }
})

export const {
    selectAll: selectAllColors,
    selectIds: selectColorIds
} = colorsAdapter.getSelectors(state => state.colors)

export default colorsSlice.reducer
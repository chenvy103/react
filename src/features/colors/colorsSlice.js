import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import {capitalize} from '../filters/colors'


const colorsAdapter = createEntityAdapter()
const initialState = colorsAdapter.getInitialState({
    status: 'idle'
})



export const getColors = createAsyncThunk(
    'colors/getColors',
    async(colorId, {rejectWithValue})=>{
        try{
            const link = `http://127.0.0.1/api/colors`
            const idParam = colorId ? `/${colorId}` : ''
            const url = link + idParam
            const res = await fetch(url)
            //console.log(res,colorId)
            if(res.ok){
                return res.json()
            }else{
                console.log('error',await res.json())
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteColor = createAsyncThunk(
    'colors/deleteColor',
    async (colorId, {rejectWithValue}) => {
        try {
            const res = await fetch(`http://127.0.0.1/api/colors/${colorId}`, {
                method: 'DELETE'
            })
            if(res.ok){
                return res.json()
            }else{
                console.log('error',await res.json())
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addColor = createAsyncThunk(
    'colors/addColor',
    async (name, {rejectWithValue}) => {
        try {
            const res = await fetch(`http://127.0.0.1/api/colors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({name: capitalize(name)})
            })
            if(res.ok){
                return res.json()
            }else{
                console.log('error',await res.json())
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateColor = createAsyncThunk(
    'colors/updateColor',
    async ({colorId, newName}, {rejectWithValue}) => {
        try {
            const res = await fetch(`http://127.0.0.1/api/colors/${colorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({name: capitalize(newName)})
            })
            if(res.ok){
                return res.json()
            }else{
                console.log('error',await res.json())
            }
        } catch (error) {
            return rejectWithValue(error)
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
        .addCase(deleteColor.fulfilled, (state, action)=>{
            colorsAdapter.removeOne(state, action.payload.data.id)
        })
        .addCase(addColor.fulfilled, (state,action)=>{
            colorsAdapter.addOne(state, action.payload.data)
        })
        .addCase(addColor.rejected, (state, action) => {
            console.log(state, action)
        })
        .addCase(updateColor.fulfilled, (state, action)=>{
            console.log('update', action.payload.data)
            colorsAdapter.upsertOne(state, action.payload.data)
        })
        .addCase(updateColor.rejected, (state, action)=>{
            console.log(state, action)
        })
        
    }
})

export const {
    selectAll: selectAllColors,
    selectIds: selectColorIds,
    selectById: selectColorById
} = colorsAdapter.getSelectors(state => state.colors)
export const {searchColors} = colorsSlice.actions
export default colorsSlice.reducer
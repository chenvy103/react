import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const initialState = {
    status: StatusFilters.All,
    colors: []
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers:{
        filterByStatus(state, action){
            state.status = action.payload
        },

        filteredColors:{
            reducer: (state, action)=>{
                const { color, changeType } = action.payload
                switch(changeType){
                    case 'checked': return state.colors.concat(color);
                    case 'uncheck': return state.colors.filter((colors) => colors != color)
                }
            },
            prepare: (color, changeType)=>{
                return{
                    payload:{
                        color: color,
                        changeType: changeType
                    }
                }
            }
        },

        filterByColors(state, action){
            state.colors = action.payload
        }
    }
})

const { actions, reducer } = filtersSlice

export const { filterByStatus, filteredColors, filterByColors } = actions

export default reducer
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
                const {colors} = state
                switch(changeType){
                    case 'checked': 
                        if (!colors.includes(color)) {
                            state.colors.push(color)
                        }
                        break;
                    case 'uncheck':
                        state.colors = state.colors.filter(
                            existColor => existColor !== color
                        )
                        break;
                    default: return state
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
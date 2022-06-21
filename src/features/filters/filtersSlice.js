import { client } from '../../api/client'
import { todosLoaded, todosLoading } from '../todos/todosSlice'

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}
  
const initialState = {
    status: StatusFilters.All,
    colors: []
}
  
function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {
                ...state,
                status: action.payload
            }
        }

        case 'filters/colorFilterChanged': {
            let { color, changeType } = action.payload
            const { colors } = state
    
            switch (changeType) {
                case 'checked': {
                    if (colors.includes(color)) return state // color co san
                    
                    return {
                        ...state,
                        colors: state.colors.concat(color)
                    }
                }

                case 'uncheck': {
                    return {
                        ...state,
                        colors: state.colors.filter(
                            (existColor) => existColor !== color
                        )
                    }
                }
                default: return state
            }
        }
        case 'filters/colorsFiltered':{
            return {
                ...state,
                colors: action.payload
            }
        }

        default: return state
    }
}
  

export default filtersReducer

export const statusFilterChanged = (status) => ({
    type: 'filters/statusFilterChanged',
    payload: status
})
  
export const colorFilterChanged = (color, changeType) => {
    return {
      type: 'filters/colorFilterChanged',
      payload: { color, changeType }
    }
}
export const colorsFiltered = (colors) => {
    return {
      type: 'filters/colorsFiltered',
      payload: colors
    }
}


export function getTodos({status, colors}){
    return async (dispatch, getState) => {
        //const response = await client.get('/fakeApi/todos');
        console.log('colorFil',colors)
        const res = await fetch('http://127.0.0.1/api/todos?'+`&status=${status}`+`&colors=${colors}`)
        
        if (res.status == 200){
            dispatch(todosLoading())
            const data = await res.json();
            dispatch(statusFilterChanged(status))
            dispatch(colorsFiltered(colors))
            dispatch(todosLoaded(data.data))
        }
        else{
            console.log("Error", res.message);
        }
    }
}
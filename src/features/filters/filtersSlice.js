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

                case 'removed': {
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

        default: return state
    }
}
  

export default filtersReducer
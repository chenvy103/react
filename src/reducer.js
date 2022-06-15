import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
    //keys = key status, value = reducer func
    todos: todosReducer, //state `todos`, handled by `todosReducer`
    filters: filtersReducer,
})

export default rootReducer

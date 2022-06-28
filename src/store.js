import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosReducer'
import filtersReducer from './features/filters/filtersReducer'

/*
const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // store enhancers
)
const store = createStore(rootReducer, composedEnhancer)
*/

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer
  }
})

export default store

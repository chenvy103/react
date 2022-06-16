import { client } from '../../api/client'

const initialState = {
    status: 'idle', //notAction
    entities: {}
}

function todosReducer (state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            const todo = action.payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todo.id]: todo
                }
            }
        }

        case 'todos/todoToggled': {
            const todoId = action.payload
            const todo = state.entities[todoId]
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todoId]:{
                        ...todo,
                        completed: !todo.completed
                    }
                }
            }
        }

        case 'todos/todoColorSelected': {
            const { color, todoId } = action.payload
            const todo = state.entities[todoId]
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todoId]:{
                        ...todo,
                        color
                    }
                }
            }
        }

        case 'todos/todoDeleted': {
            const newEntities = {...state.entities} //copy
            delete newEntities[action.payload.todoId] //del
            return{
                ...state,
                entities: newEntities
            }
        }

        case 'todos/allCompleted': {
            const newEntities = {...state.entities} 
            Object.values(newEntities).forEach((todo)=>{
                newEntities[todo.id] = {
                    ...todo,
                    completed: true,
                }
            })
            return {
                ...state,
                entities: newEntities
            }
        }

        case 'todos/completedCleared': {
            const newEntities = {...state.entities} 
            Object.values(newEntities).forEach((todo)=>{
                if(todo.completed) delete newEntities[todo.id]
            })
            return {
                ...state,
                entities: newEntities
            }
        }
        
        case 'todos/todosLoading':{
            return{
                ...state,
                status: 'loading'
            }
        }

        //update loaded action to reset the state flag to 'idle'
        case 'todos/todosLoaded':{
            const newEntities = {}
            action.payload.forEach((todo) => {
                newEntities[todo.id] = todo
            })
            return {
                ...state,
                status: 'idle',
                entities: newEntities,
            }
        }

        default: return state
    }
}

export default todosReducer


export const todoAdded = (todo) => ({
    type: 'todos/todoAdded', 
    payload: todo 
})

export const todoToggled = (todoId)=> ({
    type: 'todos/todoToggled', 
    payload: todoId
})

export const todoColorSelected = (todoId, color)=> ({
    type: 'todos/todoColorSelected', 
    payload: {todoId, color}
})

export const todoDeleted = (todoId)=> ({
    type: 'todos/todoDeleted', 
    payload: {todoId}
})

export const allTodosCompleted = () => ({ 
    type: 'todos/allCompleted' 
})

export const completedTodosCleared = () => ({
     type: 'todos/completedCleared' 
})

export const todosLoading = () => ({
    type: 'todos/todosLoading' 
})

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos
})

export function createMarkTodosCompleted(){
    return {
        type: 'todos/allCompleted'
    }
}
// Thunk function
export const fetchTodos = () => async (dispatch) => {
    dispatch(todosLoading())
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
}



export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = { text }
        const response = await client.post('/fakeApi/todos', { todo: initialTodo })
        dispatch(todoAdded(response.todo))
    }
}

export function apiMarkCompleted(){
    return async (dispatch, getState) => {
        const response = await client.get('/fakeApi/todos');
        dispatch(allTodosCompleted());
    }
}
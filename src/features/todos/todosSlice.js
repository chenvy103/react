import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    entities: {}
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        addTodo(state, action){
            const todo = action.payload
            const todoId = todo.id;
            state.entities[todoId] = todo; 
        },

        setTodoColor: {
            reducer: (state, action) => {
                const { color, id } = action.payload
                state.entities[id].color = color
            },
            prepare: (todoId, color) => {
                return {
                    payload: {
                        color: color,
                        id: todoId
                    }
                }
            }
        },

        setTodoToggle(state, action){
                const id = action.payload
                const completed = !state.entities[id].completed;
                state.entities[id].completed = completed;
            
        },

        deleteTodo(state, action){
            const todoId = action.payload
            delete state.entities[todoId]
            //return state.todos.filter(todo => todo.id !== todoId);
        },

        markAllCompleted(state, action){
            const ids = action.payload;
            if(ids != null){
                ids.forEach(id => {
                    state.entities[id].completed = true
                });
            }
        },

        clearCompleted(state,action){
            const ids = action.payload;
            if(ids != null){
                ids.forEach(id => {
                    delete state.entities[id]
                });
            }
        },

        todoLoading(state){
            state.status = 'loading'
        },

        todoLoaded(state, action){
            const todos = action.payload
            if(todos != null){
                todos.forEach(todo =>{
                    state.entities[todo.id] = todo; 
                })
            }
            state.status = 'idle'
        },

    }
})

const { actions, reducer } = todosSlice

export const { addTodo, setTodoColor, setTodoToggle, deleteTodo, markAllCompleted, clearCompleted, todoLoading, todoLoaded } = actions

export default reducer


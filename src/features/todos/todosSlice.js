import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { convertBack, convertTo } from "./todoAdapter"

const todosAdapter = createEntityAdapter()
const initialState = todosAdapter.getInitialState({
    status: 'idle',
    entities: {},
    error: ''
})


export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async({status, colors}, { rejectWithValue }) =>{
        try{
            const link = `http://127.0.0.1/api/todos?page=1`
            const statusParam = status ? `&status=${status}` : ''
            const colorsParam = colors ? `&colors=${colors}` : ''
            const url = link + statusParam + colorsParam
            const res = await fetch(url)
            if(res.ok){
                return res.json()
            }else{
                const err = await res.json()
                alert(err.message)
                return err
            }
        }catch(error){
            console.log('catch',error)
            return rejectWithValue(error.response)
        }
        
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async(todo) =>{
        const newTodo = {
            text: todo.text,
            color: todo.color 
        }
        const res = await fetch(`http://127.0.0.1/api/todos`,{
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if(res.ok){
            return res.json()
        }else{
            console.log('error',await res.json())
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async(todo, {rejectWithValue}) => {
        try{
            const editTodo = convertBack(todo);
            console.log('edit',editTodo)
            const res = await fetch(`http://127.0.0.1/api/todos/`+ `${todo.id}`,{
                method: 'PUT',
                body: JSON.stringify(editTodo),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
            })
            if(res.ok){
                return res.json()
            }else{
                console.log('error',await res.json())
            }
        }catch(error){
            console.log('error', error.response)
            return rejectWithValue(error.response)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async(id) =>{
        const res = await fetch(`http://127.0.0.1/api/todos/`+ `${id}`,{
            method: 'DELETE'
        })
        if(res.ok){
            return res.json()
        }else{
            console.log('error',await res.json())
        }
    }
)

export const markAllCompleted = createAsyncThunk(
    'todos/markAllCompleted',
    async(ids=[]) =>{
        const res = await fetch('http://127.0.0.1/api/todos/mark-completed?'+`ids=[${ids.toString()}]`)
        if(res.ok){
            return res.json()
        }else{
            console.log('error',await res.json())
        }
    }
)
export const clearAllCompleted = createAsyncThunk(
    'todos/clearAllCompleted',
    async(ids=[]) =>{
        const res = await fetch('http://127.0.0.1/api/todos/clear-completed?'+`ids=[${ids.toString()}]`)
        if(res.ok){
            return res.json()
        }else{
            console.log('error',await res.json())
        }
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        addATodo(state, action){
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

        deleteATodo(state, action){
            const todoId = action.payload
            delete state.entities[todoId]
            //state.todos.filter(todo => todo.id !== todoId);
        },

        markCompleted(state, action){
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

        todosLoading(state){
            state.status = 'loading'
        },

        todosLoaded(state, action){
            const todos = action.payload
            if(todos != null){
                todos.forEach(todo =>{
                    state.entities[todo.id] = todo; 
                })
            }
            state.status = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getTodos.fulfilled, (state, action) =>{
                if(action.payload.message){
                    state.error = action.payload.message
                    console.log('notOK', state.error)
                    state.status = 'error'
                }
                else{
                    console.log('OK')
                    const data = action.payload.data
                    const convertedTodo = data === null ? null : 
                    data.map((todo)=>convertTo(todo))
                    todosAdapter.setAll(state, convertedTodo)
                    state.status = 'idle'
                }
                
            })
            .addCase(getTodos.rejected, (state, action) =>{
                todosAdapter.removeAll(state)
                console.log(action.error.message)
                state.status = 'failed'
            })
            .addCase(addTodo.fulfilled, (state, action) =>{
                console.log('action', action.payload)
                todosAdapter.addOne(state, action.payload.data)
            })
            .addCase(updateTodo.fulfilled, (state, action) =>{
                console.log(action.payload.data)
                const updatedTodo = convertTo(action.payload.data)
                todosAdapter.upsertOne(state, updatedTodo)
            })
            .addCase(updateTodo.rejected, (state, action)=>{
                console.log(state, action)
            })
            .addCase(deleteTodo.fulfilled, (state, action) =>{
                todosAdapter.removeOne(state, action.payload.data.id)
            })

            
    }
})

const { actions, reducer } = todosSlice

export const { addATodo, setTodoColor, setTodoToggle, deleteATodo, markCompleted, clearCompleted, todosLoading, todosLoaded } = actions

export const {
    selectAll: selectTodos,
    selectIds: selectTodoIds,
    selectById: selectTodoById,
    selectEntities
} = todosAdapter.getSelectors(state => state.todos)
/*
const selectCompletedTodos = createSelector(
    selectTodos,
    todos => todos.filter(todo => todo.completed)
)

export const selectCompletedTodoIds = createSelector(
    selectCompletedTodos,
    completedTodos => completedTodos.map(todo => todo.id)
)
*/
export default reducer


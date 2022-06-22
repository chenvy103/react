import { convertBack, convertTo } from "./todoAdapter"

const initialState = {
    status: 'idle', //notAction
    entities: {},
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

        case 'todos/markCompleted': {
            const ids = action.payload;
            // kiem tra
            const newEntities = {...state.entities} 
            Object.values(newEntities).forEach((todo)=>{
                const completed = ids.includes(todo.id) ? true : todo.completed;
                newEntities[todo.id] = {
                    ...todo,
                    completed: completed,
                }
            })
            return {
                ...state,
                entities: newEntities
            }
        }

        case 'todos/clearCompleted': {
            const ids = action.payload;
            // kiem tra
            const newEntities = {...state.entities} 
            Object.values(newEntities).forEach((todo)=>{
                if (todo.completed) {
                    delete newEntities[todo.id]
                }
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

export const markTodosCompleted = (ids = []) => ({ 
    type: 'todos/markCompleted',
    payload: ids
})

export const clearTodosCompleted = (ids = []) => ({
    type: 'todos/clearCompleted',
    payload: ids
})

export const todosLoading = () => ({
    type: 'todos/todosLoading' 
})

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos
})

//func
export function createMarkTodosCompleted(){
    return {
        type: 'todos/allCompleted',
    }
}


// Thunk function
export const fetchTodos = () => async (dispatch, getState) => {
    //
    dispatch(todosLoading())
    const res = await fetch(`http://127.0.0.1/api/todos?page=1`);
    if(res.status == 200){
        const data = await res.json();
        const convertedTodo = data === null ? null : data.data.map((todo)=>convertTo(todo))  ;
        dispatch(todosLoaded(convertedTodo))
    }
    else{
        console.log("Error", res.message);
    }
   
}


export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const newTodo = { text: text }
        const res = await fetch(`http://127.0.0.1/api/todos`,{
            method:"POST",
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if(res.status == 200) {
            const data = await res.json();
            const todo ={
                id: data.data.id,
                text: data.data.text,
                completed: false,
                color: null
            }
            console.log('added', data)
            dispatch(todoAdded(todo))
        }
        else{
            console.log("Error", res.message);
        }
        //const response = await client.post('/fakeApi/todos', { todo: initialTodo })
        
    }
}

export function apiMarkCompleted(ids = []){
    return async (dispatch, getState) => {
        console.log(`ids=[${ids.toString()}]`)
        // send request to server
        // get response 
        // if success then update the store by dispach to action ids []
        // then
        
        const res = await fetch('http://127.0.0.1/api/todos/mark-completed?'+`ids=[${ids.toString()}]`)
        console.log(res)
        if(res.status == 200){
            dispatch(markTodosCompleted(ids));
        }
        else{
            console.log("Error", res.message);
        }
        //dispatch(allTodosCompleted(response));
    }
}

export function apiClearCompleted(ids =[]){
    return async (dispatch, getState) => {
        console.log(`ids=[${ids.toString()}]`)
        const res = await fetch('http://127.0.0.1/api/todos/clear-completed?'+`ids=[${ids.toString()}]`)

        if(res.status == 200){
            dispatch(clearTodosCompleted(ids));
        }
        else{
            console.log("Error", res.message);
        }
    }
}

export function editTodo(todo){
    return async (dispatch, getState) => {
        console.log('check', todo)
        const editTodo = convertBack(todo);
        console.log(editTodo);
        try {
            const res = await fetch(`http://127.0.0.1/api/todos/`+ `${todo.id}`,{
                method:"PUT",
                body: JSON.stringify(editTodo),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log("edit",todo);
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    /*
        console.log(res)
        if(res.status == 200){
            const data = await res.json();
            console.log("edit",data);
            //dispatch(todoToggled(todo.id))
        }
        else{
            console.log("Error", res.message);
        }
        */
    }
}

export function deleteTodo(id){
    return async (dispatch, getState) => {
        try {
            
            const res = await fetch(`http://127.0.0.1/api/todos/`+ `${id}`,{
                method:"DELETE",
                body: JSON.stringify({id:id}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log("del",id);
            dispatch(todoDeleted(id))
        } catch (error) {
            console.log(error);
        }
    }
}
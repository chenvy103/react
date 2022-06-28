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


export function saveNewTodo(todo) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const newTodo = {
            text: todo.text,
            color: todo.color 
        }
        const res = await fetch(`http://127.0.0.1/api/todos`,{
            method:"POST",
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if(res.status == 200) {
            console.log(newTodo)
            const data = await res.json();
            const todo ={
                id: data.data.id,
                text: data.data.text,
                completed: false,
                color: data.data.color
            }
            console.log('added', data)
            dispatch(addTodo(todo))
            
            //update color by PUTmethod
            if(newTodo.color!=null){
                dispatch(setTodoColor(todo.id, newTodo.color))
                dispatch(editTodo({...todo, color:newTodo.color}))
            }
        }
        else{
            console.log("Error", res.message);
            alert("invalid input")
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
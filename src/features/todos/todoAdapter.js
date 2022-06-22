export function convertTo(data){
    return {
        "id" : data.id,
        "text": data.text,
        "color" : data.color?.name,
        "completed": data.completed
    }
}

export function convertBack(todo){
    return {
        "id": todo.id,
        "text": todo.text,
        "color": todo.color,
        "completed": todo.completed ? "true" : "false" 
    }
}
export function convertTo(data){
    return {
        "id" : data.id,
        "text": data.text,
        "color" : data.color?.id,
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
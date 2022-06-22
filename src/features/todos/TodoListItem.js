import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'

import {todoColorSelected, todoDeleted, todoToggled, editTodo, deleteTodo} from './todosSlice'
import {selectTodoById} from './selectsSlice'


export const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
    {c}
    </option>
))

function TodoListItem ({ id }) {
  // `selectTodoById` with state & ID value
    const todo = useSelector((state) => selectTodoById(state, id))
    const { text, completed, color } = todo
    const dispatch = useDispatch()

    
    const handleToggleChanged = ()=>{
        dispatch(editTodo({...todo, completed: !todo.completed}))
        dispatch(todoToggled(todo.id))
        
    }

    const handleColorChanged = (e) => {
        const color = e.target.value
        dispatch(todoColorSelected(todo.id, color))
        dispatch(editTodo({...todo, color:color}))
    }

    

    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={handleToggleChanged}
                    />
                    <div className="todo-text">{text}</div>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                        value={color}
                        style={{ color }}
                        onChange={handleColorChanged}
                    >
                        <option value=""></option>
                        {colorOptions}
                    </select>
                    <button 
                        className="destroy" 
                        onClick={() => {dispatch(deleteTodo(todo.id))}}       
                    >
                        &times;
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem

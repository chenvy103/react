import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllColors } from '../colors/colorsSlice'

import {selectTodoById} from './selectsSlice'
import { setTodoToggle, setTodoColor, deleteTodo, updateTodo } from './todosSlice'


function TodoListItem ({ id }) {
  // `selectTodoById` with state & ID value
    const todo = useSelector((state) => selectTodoById(state, id))
    const { text, completed, color } = todo
    const dispatch = useDispatch()

    
    const colorsObj = useSelector(selectAllColors)
    const colorOptions = colorsObj.map((color) => (
        <option key={color.id} value={color.id}>
        {color.name}
        </option>
    ))

    
    const handleToggleChanged = ()=>{
        const findedColor = colorsObj.find(item => item.id === parseInt(color))
        dispatch(setTodoToggle(todo.id))
        dispatch(updateTodo({...todo, color:findedColor.name, completed: !todo.completed}))
    }

    const handleColorChanged = (e) => {
        const color = e.target.value
        console.log(typeof color)
        const findedColor = colorsObj.find(item => item.id === parseInt(color))
        console.log(findedColor)
        dispatch(setTodoColor(todo.id, color))
        dispatch(updateTodo({...todo, color:findedColor.name}))
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

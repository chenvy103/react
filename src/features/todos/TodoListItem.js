import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { availableColors, capitalize } from '../filters/colors'

const selectTodoById = (state, todoId) => {
    return state.todos.find((todo) => todo.id === todoId)
}

function TodoListItem ({ id }) {
  // `selectTodoById` with state & ID value
    const todo = useSelector((state) => selectTodoById(state, id))
    const { text, completed, color } = todo

    const dispatch = useDispatch()


    const handleColorChanged = (e) => {
        const color = e.target.value
        dispatch({
            type: 'todos/colorSelected',
            payload: { todoId: todo.id, color }
        })
    }

    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c}>
        {capitalize(c)}
        </option>
    ))

    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={() => {
                            dispatch({ type: 'todos/todoToggled', payload: todo.id })
                        }}
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
                        onClick={() => {
                            dispatch({ type: 'todos/todoDeleted', payload: todo.id })
                        }}       
                    >
                        &times;
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem

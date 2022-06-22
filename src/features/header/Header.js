import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../todos/todosSlice'
import {colorOptions} from '../todos/TodoListItem'

function Header(){
    const [text, setText] = useState('')
    const [status, setStatus] = useState('idle')
    const inputRef = useRef()
    const dispatch = useDispatch()

    const options = [
        {value: '', text: ''},
        {value: 'Green', text: 'Green'},
        {value: 'Blue', text: 'Blue'},
        {value: 'Orange', text: 'Orange'},
        {value: 'Purple', text: 'Purple'},
        {value: 'Red', text: 'Red'},
    ];
    
    const [color, setColor] = useState(options[0].value)

    const handleKeyDown = async (e) => {
        //pressed Enter key
        const aNewTodo= {
            text: text.trim(),
            color: color
        }
        if (e.which === 13 && aNewTodo) {
            setStatus('loading')
            await dispatch(saveNewTodo(aNewTodo))
            //clear out
            setText('')
            setStatus('idle')
            setColor(options[0].value)
            inputRef.current.focus()
        }

    }

    let isLoading = status === 'loading'
    let placeholder = isLoading ? '' : 'What needs to be done?'
    let loader = isLoading ? <div className="loader" /> : null

    return (
        <header className="header">
            <input
                ref={inputRef}
                className="new-todo"
                placeholder={placeholder}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            <div className="segment buttons">
                <select
                    className="colorPicker"
                    value={color}
                    style={{ color }}
                    onChange={e => setColor(e.target.value)}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}

                </select>
            </div>
            {loader}
        </header>
    )
}

export default Header

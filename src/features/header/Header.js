import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../todos/todosSlice'

function Header(){
    const [text, setText] = useState('')
    const [status, setStatus] = useState('idle')

    const dispatch = useDispatch()

    const handleKeyDown = async (e) => {
        //pressed Enter key
        const trimmedText = text.trim()
        if (e.which === 13 && trimmedText) {
            setStatus('loading')
            await dispatch(saveNewTodo(trimmedText))
            //clear out
            setText('')
            setStatus('idle')
        }
    }

    let isLoading = status === 'loading'
    let placeholder = isLoading ? '' : 'What needs to be done?'
    let loader = isLoading ? <div className="loader" /> : null

    return (
        <header className="header">
            <input
                className="new-todo"
                placeholder={placeholder}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            {loader}
        </header>
    )
}

export default Header

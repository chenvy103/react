import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RemainingTodos from './RemainingTodos'
import StatusFilter from './StatusFilter'
import ColorFilters from './ColorFilters'

function Footer() {
    const dispatch = useDispatch()

    const todosRemaining = useSelector((state) => {
        const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
        return uncompletedTodos.length
    })

    const { status, colors } = useSelector((state) => state.filters)

    const onColorChange = (color, changeType) =>
        dispatch({
            type: 'filters/colorFilterChanged',
            payload: { color, changeType }, 
        })

    const onStatusChange = (status) =>dispatch({
        type: 'filters/statusFilterChanged', payload: status 
    })

    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button 
                    className="button" 
                    onClick={() => dispatch({ type: 'todos/allCompleted' })}
                >
                    Mark All Completed
                </button>
                <button 
                    className="button" 
                    onClick={() => dispatch({ type: 'todos/completedCleared' })}
                >
                    Clear Completed
                </button>
            </div>

            <RemainingTodos count={todosRemaining} />
            <StatusFilter value={status} onChange={onStatusChange} />
            <ColorFilters value={colors} onChange={onColorChange} />
        </footer>
    )
}

export default Footer

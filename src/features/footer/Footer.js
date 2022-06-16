import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RemainingTodos from './RemainingTodos'
import StatusFilter from './StatusFilter'
import ColorFilters from './ColorFilters'

import {colorFilterChanged, statusFilterChanged} from '../filters/filtersSlice'
import {completedTodosCleared,createMarkTodosCompleted, allTodosCompleted, apiMarkCompleted} from '../todos/todosSlice'
import {selectTodos} from '../todos/selectsSlice'
import { bindActionCreators } from 'redux'

function Footer() {
    const dispatch = useDispatch()

    const todosRemaining = useSelector((state) => {
        const uncompletedTodos = selectTodos(state).filter((todo) => !todo.completed)
        return uncompletedTodos.length
    })

    const { status, colors } = useSelector((state) => state.filters)

    const onColorChange = (color, changeType) =>
        dispatch(colorFilterChanged(color, changeType))

    const onStatusChange = (status) =>{
        dispatch(statusFilterChanged(status))
        console.log(statusFilterChanged({status}))
    }
    
    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button 
                    className="button" 
                    onClick={()=>{dispatch(allTodosCompleted())}}
                >
                    Mark All Completed
                </button>
                <button 
                    className="button"
                    onClick={()=>{dispatch(completedTodosCleared())}}
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

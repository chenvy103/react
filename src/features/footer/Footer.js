import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RemainingTodos from './RemainingTodos'
import StatusFilter from './StatusFilter'
import ColorFilters from './ColorFilters'

import {colorFilterChanged, getTodos, statusFilterChanged} from '../filters/filtersSlice'
import {apiClearCompleted, apiMarkCompleted} from '../todos/todosSlice'
import {selectTodos} from '../todos/selectsSlice'

function Footer() {
    const dispatch = useDispatch()

    const todosRemaining = useSelector((state) => {
        const uncompletedTodos = selectTodos(state).filter((todo) => !todo.completed)
        return uncompletedTodos.length
    })

    const { status, colors } = useSelector((state) => state.filters)


    const uncompletedIds = useSelector((todos)=>{
        return selectTodos(todos).filter((todo) => !todo.completed).map(todo => todo.id);
    })

    const clearCompletedIds = useSelector((todos)=>{
        return selectTodos(todos).filter((todo)=> todo.completed).map(todo => todo.id)
    })

    const onColorChange = (colors) =>{
        console.log('colors',colors)
        //dispatch(colorFilterChanged(color,changeType))
        dispatch(getTodos({status, colors}))
    }

        // Use selecter to ids get uncompleted todos 
        // Dispath to thunk API

    const onStatusChange = (status) =>{
        dispatch(getTodos({status, colors}))
        //dispatch(statusFilterChanged(status))
    }
    const handleCompletedTodos =()=>{
        dispatch(apiMarkCompleted(uncompletedIds))
    }

    const handleClearCompletedTodos =() =>{
        dispatch(apiClearCompleted(clearCompletedIds))
    }
    
    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button 
                    className="button" 
                    onClick={handleCompletedTodos}
                >
                    Mark All Completed
                </button>
                <button 
                    className="button"
                    onClick={handleClearCompletedTodos}
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

import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds } from './todosSlice'


function TodoList(){
  const todoIds = useSelector(selectTodoIds)
  const status = useSelector(state => state.todos.status)
  const err = useSelector(state => state.todos.error)


  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return (
    <div>

      {status === 'loading' ? (
        <div className='todo-list'>
            <div className='loader'></div>
        </div>
      ) : status === 'error' ? (
        <div className='todo-list'>
            <div 
              className='error'
              style={{textAlign: 'center', fontSize: 50}}>
                {err}
            </div>
        </div>
      ) : (
        <ul className='todo-list'>
            {renderedListItems}
        </ul>
      )}

    </div>
  )
}

export default TodoList

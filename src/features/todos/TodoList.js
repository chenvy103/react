import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds, getTodos } from './todosSlice'


function TodoList(){
  const todoIds = useSelector(selectTodoIds)
  const status = useSelector(state => state.todos.status)
  const {status: stateStatus, colors} = useSelector(state => state.filters)

  const dispatch = useDispatch()

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })
  
  React.useEffect(() => {
    if (todoIds.length === 0) {
        dispatch(getTodos({status: stateStatus, colors}))
    }
  }, [todoIds.length])

  return (
    <div>
      {status === 'loading' ? (
        <div className='todo-list'>
            <div className='loader'></div>
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

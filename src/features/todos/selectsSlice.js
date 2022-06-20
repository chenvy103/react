import { createSelector } from "reselect"
import { StatusFilters } from "../filters/filtersSlice"

const selectTodoEntities = (state) => state.todos.entities

export const selectTodos = createSelector(
    selectTodoEntities,
    (entities) => Object.values(entities)
)

export const selectTodoById = (state, todoId) => {
    return selectTodoEntities(state)[todoId]
}

export const selectTodoIds = createSelector(
    selectTodos,
    (todos) => todos.map((todo)=>todo.id)
)

export const selectFilteredTodos = createSelector(
    selectTodos, //all todos
    (state) => state.filters, //all filter values
    // Output 
    (todos, filters) => {
        const { status, colors } = filters
        //console.log(colors)
        
    
        const completedStatus = status === StatusFilters.Completed
        return todos.filter((todo) => {
            const statusMatches = (status === StatusFilters.All) || todo.completed !== completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            //console.log(statusMatches, colorMatches)
            //console.log('todoColor',todo.color)
            return statusMatches && colorMatches
        })
    }
)

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

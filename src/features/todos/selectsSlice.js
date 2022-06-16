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
    selectTodos,
    (state) => state.filters,
    (todos, filters) => {
       
        const {status, colors} = filters;
        console.log('status', status)
        const completedStatus = status === StatusFilters.Completed;
        return todos.filter((todo)=>{
            console.log(todo);
            const statusMatches = (status == StatusFilters.All) || (todo.Completed == completedStatus)
            console.log("Matched", statusMatches, completedStatus);
            const colorMatches = colors.length === 0 || colors.inclues(todo.color)
            return statusMatches && colorMatches
        })
    }
)

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

import { addTodo, setTodoColor, deleteTodo, setTodoToggle, markAllCompleted, clearCompleted, todoLoading, todoLoaded } from "./todosSlice";
import reducer from "./todosSlice";

describe("Test todo reducer", ()=>{
    it("Test add new todo", ()=>{
        expect(
            reducer({
                status: "Idle",
                entities: {}
            }, addTodo({
                id:1,
                text: 'Test',
                completed: false,
                color:null
            }))
        ).toEqual({
            status: "Idle",
            entities: {
                1: {
                    id : 1,
                    text: "Test",
                    completed: false,
                    color: null
                }
            }
        })
    });
    it("Test action creator", ()=>{
        expect(
            setTodoColor(1, 'red')
        ).toEqual({
           type: "todos/setTodoColor",
           payload: {
            id: 1,
            color: "red"
           }
        })
    });
    it("Test markCompleted", ()=>{
        expect(
            reducer({
                status: "Idle",
                entities: {
                    1: {
                        id : 1,
                        text: "Test",
                        completed: false,
                        color: 'Blue'
                    },
                    2: {
                        id : 2,
                        text: "TestA",
                        completed: true,
                        color: 'Red'
                    }
                }
            }, markAllCompleted([1]))
        ).toEqual({
            status: "Idle",
            entities: {
                1: {
                    id : 1,
                    text: "Test",
                    completed: true,
                    color: 'Blue'
                },
                2: {
                    id : 2,
                    text: "TestA",
                    completed: true,
                    color: 'Red'
                }
            }
        })
    });
    it("Test clearCompleted", ()=>{
        expect(
            reducer({
                status: "Idle",
                entities: {
                    1: {
                        id : 1,
                        text: "Test",
                        completed: false,
                        color: 'Blue'
                    },
                    2: {
                        id : 2,
                        text: "TestA",
                        completed: true,
                        color: 'Red'
                    }
                }
            }, clearCompleted([2]))
        ).toEqual({
            status: "Idle",
            entities: {
                1: {
                    id : 1,
                    text: "Test",
                    completed: false,
                    color: 'Blue'
                }
            }
        })
    });
    it("Test toggle", ()=>{
        expect(
            reducer({
                status: "Idle",
                entities: {
                    1: {
                        id : 1,
                        text: "Test",
                        completed: false,
                        color: 'Blue'
                    }
                }
            }, setTodoToggle(1))
        ).toEqual({
            status: "Idle",
            entities: {
                1: {
                    id : 1,
                    text: "Test",
                    completed: true,
                    color: 'Blue'
                }
            }
        })
    });
    it("Test del a todo", ()=>{
        expect(
            reducer({
                status: "Idle",
                entities: {
                    1: {
                        id : 1,
                        text: "Test",
                        completed: false,
                        color: 'blue'
                    }
                }
            }, deleteTodo(1))
        ).toEqual({
            status: "Idle",
            entities: {}
        })
    });
    it("Test todoLoaded", ()=>{
        expect(
            reducer({
                status: "loading",
                entities: {}
            }, todoLoaded(
                [{id : 1,
                text: "Test",
                completed: false,
                color: 'Blue'},
                
                {id : 2,
                text: "TestA",
                completed: true,
                color: 'Red'
                }]
            ))
        ).toEqual({
            status: "idle",
            entities: {
                1: {
                    id : 1,
                    text: "Test",
                    completed: false,
                    color: 'Blue'
                },
                2: {
                    id : 2,
                    text: "TestA",
                    completed: true,
                    color: 'Red'
                }
            }
        })
    });
});
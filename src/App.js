import React from 'react'

import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Footer from './features/footer/Footer'

import store from './store'

import { getTodos } from './features/todos/todosSlice'
import { getColors } from './features/colors/colorsSlice'

function App() {
  React.useEffect(()=>{
    const fetchData = async ()=>{
      try{
        await store.dispatch(getColors()).unwrap();
        await store.dispatch(getTodos({})).unwrap();
      }catch (err) {
        console.log(err)
      }
    };
    fetchData();
  },[])

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

import React from 'react'
import {Routes, Route, NavLink} from 'react-router-dom'
import Main from './page/Todos'
import Colors from './page/Colors'
import CreateColor from './page/CreateColor'
import EditColor from './page/EditColor'

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
      <div className='nav'>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </div>

      <nav>
        <div className="navContent">
          <div className="navLinks">
            <NavLink className='nav-link' to='/'>Todos</NavLink>
            <NavLink className='nav-link' to='/colors'>Colors</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/colors' element={<Colors/>}/>
        <Route path='/colors/create' element={<CreateColor/>}/>
        <Route path='/colors/:colorId' element={<EditColor/>}/>
      </Routes>
    </div>
  )
}

export default App

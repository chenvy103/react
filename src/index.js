import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store'

import { getTodos } from './features/todos/todosSlice'
import { getColors } from './features/colors/colorsSlice'

store.dispatch(getTodos())
store.dispatch(getColors())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

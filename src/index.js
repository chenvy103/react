import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store'

import { getColors } from './features/colors/colorsSlice'

const mounted = async() => {
  try {
    await store.dispatch(getColors());
    //await store.dispatch(getTodos());
  } catch ( e ) {
    console.error(e);
  }
}

mounted();

//store.dispatch(getColors())
//store.dispatch(getTodos())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

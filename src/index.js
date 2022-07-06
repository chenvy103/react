import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import {BrowserRouter} from 'react-router-dom'

import './index.css'
import './page/Colors.css'
import App from './App'
import store from './store'
/*
React.useEffect(()=>{
  const fetchData = async ()=>{
    await store.dispatch(getColors());
    await store.dispatch(getTodos());
  };
  fetchData();
},[])
*/

/*
const mounted = async() => {
  try {
    await store.dispatch(getColors());
    await store.dispatch(getTodos());
  } catch ( e ) {
    console.error(e);
  }
}
mounted();
*/


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

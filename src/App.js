import {Routes, Route} from 'react-router-dom'

import SignUpPage from "./page/SignUpPage"
import LoginSuccessPage from './page/LoginSuccessPage'
import UserManagementPage from './page/UserManagementPage'
import LoginPage from "./page/LoginPage";
import Homepage from './page/Homepage';
import { ProtectedRoute } from './RouteUtils/ProtectedRoute';

import React from 'react'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector(state => state.user.userInfo)
  return (
    <div>
      <Routes>  
        <Route index element={<LoginPage />} />
        <Route path='/Register' element={<SignUpPage/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Loading' element={<LoginSuccessPage/>}/>
        <Route path='/Homepage' element={<Homepage/>}/>
        <Route 
          path='/Home' 
          element={
            <ProtectedRoute user={user.isAdmin} redirectPath='/Homepage'>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
      
    </div>
  );
}

export default App;

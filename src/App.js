import {Routes, Route} from 'react-router-dom'

import SignUpPage from "./page/SignUpPage"
import UserManagementPage from './page/UserManagementPage'
import LoginPage from "./page/LoginPage";
import Homepage from './page/Homepage';
import ErrorPage from './page/ErrorPage'
import { UserRoute, AdminRoute } from './RouteUtils/ProtectedRoute';

import React from 'react'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector(state => state.user.userInfo)
  return (
    <div>
      <Routes>  
        <Route path='*' element={<ErrorPage />} />
        <Route path='/register/:invitationToken' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route element = {
          <UserRoute user={user}/>
        }>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/' element={<Homepage />} />
        </Route>
        
        <Route element ={
          <AdminRoute user={user}/>
        }>
          <Route path='manager' element={<UserManagementPage/>}/>
        </Route>

      </Routes>
      
    </div>
  );
}

export default App;

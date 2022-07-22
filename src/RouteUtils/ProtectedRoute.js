import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, redirectPath }) => {
  return isAllowed ? <Outlet/> : <Navigate to={redirectPath} replace />
};


export const AdminRoute = ({user}) => {
  return <ProtectedRoute isAllowed= {!!user.id && user.isAdmin} redirectPath='*'/>
};

export const UserRoute = ({user}) => {
  return <ProtectedRoute isAllowed= {!!user.id} redirectPath='/login'/>
};

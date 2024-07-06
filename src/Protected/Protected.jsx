// Protected.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
  const auth = useSelector(state => state.auth || {});

  console.log("Protected: auth state", auth);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default Protected;



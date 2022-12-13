import React, { useEffect, useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  useLayoutEffect(() => {});
  const loggedUser = useSelector((state) => state.loggedUser);
  return Object.keys(loggedUser).length !== 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

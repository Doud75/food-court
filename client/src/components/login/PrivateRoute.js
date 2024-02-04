import React from "react";
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ element, ...rest }) {
  const isAuthenticated = sessionStorage.getItem("token") !== null;

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

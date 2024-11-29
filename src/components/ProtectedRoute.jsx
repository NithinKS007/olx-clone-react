import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;

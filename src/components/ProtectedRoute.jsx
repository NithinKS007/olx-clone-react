import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  console.log("current user from protected route",currentUser);
  
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  console.log("ending of the current user line",currentUser);
  return children;
};

export default ProtectedRoute

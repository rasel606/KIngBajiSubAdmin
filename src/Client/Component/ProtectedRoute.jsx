import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default ({ children, requiredRole }) => {
  const { isAuthenticated, user, hasRole,token } = useAuth();
  const [loading, setLoading] = useState(true);
  const userRole = user?.user_role;
  const userToken = localStorage.getItem("authSubAdminToken");
  console.log(userToken);

  // useEffect(() => {
  //   if (!userToken && !userRole) {
  //     <Navigate to="/login" />
  //     setLoading(false);
  //   }
  // }, [user,userToken,userRole]);

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading indicator while checking authentication
  // }

  // if (userToken,userRole) {
  //   return <Navigate to="/login" />;
  // }

  // if (requiredRole === userRole) {
  //   console.log(requiredRole === hasRole(user?.user_role))
  //   return children;
  // }

  return userToken  ?  children :<Navigate to="/login" /> 
};



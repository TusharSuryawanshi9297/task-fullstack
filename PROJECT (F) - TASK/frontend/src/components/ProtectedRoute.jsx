// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// const ProtectedRoute = ({ children, role }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" replace />;
//   if (role && user.role !== role) return <Navigate to="/" replace />;

//   return children;
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  // While AuthProvider is fetching user, show loading
  if (loading) return <p>Loading...</p>;

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If role is specified and doesn't match, redirect to home
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

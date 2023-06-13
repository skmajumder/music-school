import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const currentLocation = useLocation();

  if (loading || isAdminLoading) {
    return (
      <>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </>
    );
  }
  if (!user && !isAdmin) {
    return <Navigate to={"/login"} state={{ from: currentLocation }} replace />;
  }
  return children;
};

export default AdminRoute;

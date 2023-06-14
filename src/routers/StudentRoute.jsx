import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isStudent, isStudentLoading } = useStudent();
  const currentLocation = useLocation();

  if (loading || isStudentLoading) {
    return (
      <>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </>
    );
  }
  if (!user && !isStudent) {
    return <Navigate to={"/"} state={{ from: currentLocation }} replace />;
  }
  return children;
};

export default StudentRoute;

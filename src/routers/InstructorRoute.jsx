import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useIsInstructor from "../hooks/useIsInstructor";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isInstructor, isInstructorLoading } = useIsInstructor();
  const currentLocation = useLocation();

  if (loading || isInstructorLoading) {
    return (
      <>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </>
    );
  }
  if (user && isInstructor) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: currentLocation }} replace />;
};

export default InstructorRoute;

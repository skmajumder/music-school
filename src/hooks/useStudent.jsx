import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useStudent = () => {
  const { user, loading } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    data: isStudent,
    isLoading: isStudentLoading,
    refetch: studentRefetch,
  } = useQuery({
    queryKey: ["isStudent", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/student/${user?.email}`);
      return response.data.student;
    },
  });
  return { isStudent, studentRefetch, isStudentLoading };
};

export default useStudent;

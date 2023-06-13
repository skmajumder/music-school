import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useIsInstructor = () => {
  const { user, loading } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    data: isInstructor,
    isLoading: isInstructorLoading,
    refetch: instructorRefetch,
  } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users/instructor/${user?.email}`
      );
      return response.data.instructor;
    },
  });
  return { isInstructor, instructorRefetch, isInstructorLoading };
};

export default useIsInstructor;

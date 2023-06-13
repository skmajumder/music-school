import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    refetch: adminRefetch,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user?.email}`);
      return response.data.admin;
    },
  });
  return { isAdmin, adminRefetch, isAdminLoading };
};

export default useAdmin;

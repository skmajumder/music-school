import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { loading: useLoading } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const {
    isLoading: loading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !useLoading,
    queryFn: async () => {
      const response = await axiosSecure(`/users`);
      return response.data;
    },
  });
  return { users, loading, refetch };
};

export default useUser;

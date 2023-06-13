import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
  const { loading: useLoading } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    isLoading: loading,
    data: instructors = [],
    refetch,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const response = await axiosSecure(`/instructors`);
      return response.data;
    },
  });
  return { instructors, loading, refetch };
};

export default useInstructor;

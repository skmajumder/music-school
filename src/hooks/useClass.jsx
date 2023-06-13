import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useClass = () => {
  const { loading: useLoading } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    isLoading: loading,
    data: classes = [],
    refetch: courseRefetch,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !useLoading,
    queryFn: async () => {
      const response = await axiosSecure(`/classes`);
      return response.data;
    },
  });
  return { classes, loading, courseRefetch };
};

export default useClass;

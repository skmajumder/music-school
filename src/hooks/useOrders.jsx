import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = () => {
  const { user, loading } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    isLoading,
    data: orders = [],
    ordersRefetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure(`/orders?email=${user?.email}`);
      return response.data;
    },
  });

  return { orders, isLoading, ordersRefetch };
};

export default useOrders;

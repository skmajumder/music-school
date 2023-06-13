import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");

  const {
    isLoading,
    data: carts = [],
    refetch,
  } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.json();
    },
  });
  return { carts, isLoading, refetch };
};

export default useCart;

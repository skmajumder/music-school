import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    isLoading: loading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/users`);
      return response.json();
    },
  });
  return { users, loading, refetch };
};

export default useUser;

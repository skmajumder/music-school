import { useQuery } from "@tanstack/react-query";

const useClass = () => {
  const {
    isLoading: loading,
    data: classes = [],
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/classes`);
      return response.json();
    },
  });
  return { classes, loading, refetch };
};

export default useClass;

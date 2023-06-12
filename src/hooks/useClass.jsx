import { useQuery } from "@tanstack/react-query";

const useClass = () => {
  const {
    isLoading: loading,
    data: classes = [],
    refetch: courseRefetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/classes`);
      return response.json();
    },
  });
  return { classes, loading, courseRefetch };
};

export default useClass;

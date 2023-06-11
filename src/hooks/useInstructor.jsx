import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
  const {
    isLoading: loading,
    data: instructors = [],
    refetch,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/instructors`);
      return response.json();
    },
  });
  return { instructors, loading, refetch };
};

export default useInstructor;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "@/service/apis/category.api";

export const useCategory = () => {
    return useQuery({
      queryKey: ["category"],
      queryFn: getCategory,
      refetchOnWindowFocus: false,
      retry: false, 
    });
  };
  
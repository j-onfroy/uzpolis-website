import { useQuery } from "@tanstack/react-query";
import { getCategory, getSubCategory } from "@/service/apis/category.api";

export const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => await getCategory(),
    retry: false,
  });
};
export const useSubCategory = (id:string) => {
  return useQuery({
    queryKey: ["sub-category", id],
    queryFn:async ()=>  await getSubCategory(id),
    retry: false,
  });
};

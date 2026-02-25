import { useQuery } from "@tanstack/react-query";
import { getCategory, getSubCategory, getSubCategoryByUrl, getSubCategoryInfo } from "@/service/apis/category.api";
import { UseQueryOptions } from "@tanstack/react-query";

type SubCategoryResponse = {
  data: {
    name: string;
    subName: string;
    description: string;
    bannerUrl: string;
    subCategories: {
      name: string;
      description: string;
      productCount: number;
      disabled: boolean;
    }[];
  };
};
type SubCategoryInfoRes = {
  success: boolean;
  data: {
    name: string;
    description: string;
    iconUrl: string;
    slug:string;
    productCount: number;
    category: {
      name: string;
      iconUrl: string;
    };
    createdAt: string;
  };
}
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


export const useSubUrlCategory = (
  id: string,
  options?: UseQueryOptions<SubCategoryResponse>
) => {
  return useQuery<SubCategoryResponse>({
    queryKey: ["sub-url", id],
    queryFn: () => getSubCategoryByUrl(id),
    enabled: !!id,
    retry: 1,
    ...options,
  });
};

export const useSubCategoryInfo = (
  id: string,
  options?: UseQueryOptions<SubCategoryInfoRes>
) => {
  return useQuery<SubCategoryInfoRes>({
    queryKey: ["sub-info", id],
    queryFn: () => getSubCategoryInfo(id),
    enabled: !!id,
    retry: 1,
    ...options,
  });
};
import api from "../index";

export const getCategory = async () => {
  const { data } = await api.get("/api/v1/categories");
  return data;
};
export const getSubCategory = async (categoryId:string) => {
  const { data } = await api.get(`/api/v1/categories/${categoryId}/sub-categories`);
  return data;
};
export const getSubCategoryByUrl = async (url:string) => {
  const { data } = await api.get(`/api/v1/categories/slug/${url}`);
  return data;
};


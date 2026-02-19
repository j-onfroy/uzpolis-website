import api from "../index";

export const getCategory = async () => {
  const { data } = await api.get("/api/v1/categories");
  return data;
};
export const getSubCategory = async (categoryId:string) => {
  const { data } = await api.get(`/api/v1/categories/${categoryId}/sub-categories`);
  return data;
};


import api from "../index";

export const getCategory = async () => {
  const { data } = await api.get("/api/v1/categories");
  return data;
};

// export const createUser = async (payload: any) => {
//   const { data } = await api.post("/users", payload);
//   return data;
// };

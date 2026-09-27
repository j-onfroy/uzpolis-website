import api from "../index";

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const createUser = async (payload: Record<string, unknown>) => {
  const { data } = await api.post("/users", payload);
  return data;
};

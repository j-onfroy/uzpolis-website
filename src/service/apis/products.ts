import api from "../index"
export const getProductsByUrl = async (url: string) => {
    const { data } = await api.get(`/api/v1/products/sub-category/${url}`);
    return data;
};

export const getProductInfo = async (id: string) => {
    const { data } = await api.get(`/api/v1/products/${id}`);
    return data;
};

export const getProductsList = async () => {
    const { data } = await api.get(`/api/v1/products`);
    return data;
};
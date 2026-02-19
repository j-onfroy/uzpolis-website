import api from "../index";

export const getProfileInfo = async () => {
    const { data } = await api.get("/api/v1/users/me");
    return data;
};
export const getReferral = async () => {
    const { data } = await api.get(`/api/v1/users/me/referral`);
    return data;
};
export const getReferralFriends = async () => {
    const { data } = await api.get(`/api/v1/users/me/referral/friends`);
    return data;
};
export const getWalletInfo = async () => {
    const { data } = await api.get(`/api/v1/users/me/wallet`);
    return data;
};
export const getTransactionInfo = async () => {
    const { data } = await api.get(`/api/v1/users/me/wallet/transactions`);
    return data;
};
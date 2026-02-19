import api from "../index";

export const loginOtp = async (payload: any) => {
    const { data } = await api.post("/api/v1/auth/send-otp", payload);
    return data;
};
export const otpVerify = async (payload: any) => {
    const { data } = await api.post("/api/v1/auth/verify-otp", payload);
    return data;
}; 
import api from "../index";

export type SendOtpRequest = {
    phoneNumber: string;
};

export type VerifyOtpRequest = {
    phoneNumber: string;
    otpCode: string;
    referralCode?: string;
};

export type AuthUser = {
    id: string;
    phoneNumber: string;
    [key: string]: unknown;
};

export type ApiResponse<T> = {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
};

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: AuthUser;
};

export const loginOtp = async (payload: SendOtpRequest): Promise<ApiResponse<string>> => {
    const { data } = await api.post("/api/v1/auth/send-otp", payload);
    return data;
};
export const otpVerify = async (payload: VerifyOtpRequest): Promise<ApiResponse<AuthTokens>> => {
    const { data } = await api.post("/api/v1/auth/verify-otp", payload);
    return data;
};

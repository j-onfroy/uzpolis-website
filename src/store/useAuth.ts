import { loginOtp, otpVerify, type ApiResponse, type AuthTokens } from "@/service/apis/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
    return useMutation({
        mutationFn: loginOtp,
    });
};

type UseAuthVerifyOptions = {
    onSuccess?: (data: ApiResponse<AuthTokens>) => void;
    onError?: (error: Error) => void;
  };
  
export const useAuthVerify = (options?: UseAuthVerifyOptions) => {
    return useMutation({
        mutationFn: otpVerify,
        ...options,
    });
};

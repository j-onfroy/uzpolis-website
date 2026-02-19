import { loginOtp, otpVerify } from "@/service/apis/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
    return useMutation({
        mutationFn: loginOtp,
    });
};

type UseAuthVerifyOptions = {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  };
  
export const useAuthVerify = (options?: UseAuthVerifyOptions) => {
    return useMutation({
        mutationFn: otpVerify,
        ...options,
    });
};
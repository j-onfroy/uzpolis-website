import { getProfileInfo, getTransactionInfo } from "@/service/apis/profile.api";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => await getProfileInfo(),
        retry: false,
    });
};

export const useTransactionInfo = () => {
    return useQuery({
        queryKey: ["transaction-info"],
        queryFn: async () => await getTransactionInfo(),
        retry: false,
    });
};
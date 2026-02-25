import { getProductInfo, getProductsByUrl, getProductsList } from "@/service/apis/products";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
type ProductRes = {
    success: boolean;
    data: {
        name: string;
        id:string
        subName: string;
        description: string;
        iconUrl: string;
        amount: number;
        category: {
            code: string
        }
        isBestSeller: boolean;
        options: {
            currency: string;
            maxCoverage: number;
            vehicleTypes: string[];
            durationMonths: number[];
        };
        provider: {
            name: string;
            logoUrl: string;
        }
    }[]
};
type ProductInfoRes = {
    success: boolean
    data: {
        id: string
        name: string
        subName: string
        description: string
        iconUrl: string
        type: string
        amount: number
        isBestSeller: boolean
        isActive: boolean
        visible: string
        options: {
            currency: string
            maxCoverage: number
            vehicleTypes: string[]
            durationMonths: number[]
            types:any;
        }
        category: Category
        subCategory: SubCategory
        provider: Provider
        createdAt: string
    }
    timestamp: string
}
export interface Category {
    id: string
    code: string
    name: string
    slug: string
    iconUrl: string
}

export interface SubCategory {
    id: string
    code: string
    name: string
    slug: string
    type: string
}

export interface Provider {
    uuid: string
    code: string
    name: string
    logoUrl: string
}

export const useProductUrl = (
    id: string,
    options?: UseQueryOptions<ProductRes>
) => {
    return useQuery<ProductRes>({
        queryKey: ["product-url", id],
        queryFn: () => getProductsByUrl(id),
        enabled: !!id,
        retry: 1,
        ...options,
    });
};

export const useProductInfo = (
    id: string,
    options?: UseQueryOptions<ProductInfoRes>
) => {
    return useQuery<ProductInfoRes>({
        queryKey: ["product-info", id],
        queryFn: () => getProductInfo(id),
        enabled: !!id,
        retry: 1,
        ...options,
    });
};

export const useProductsList = (
    options?: UseQueryOptions<ProductRes>
) => {
    return useQuery<ProductRes>({
        queryKey: ["product-list"],
        queryFn: () => getProductsList(),
        retry: 1,
        ...options,
    });
};
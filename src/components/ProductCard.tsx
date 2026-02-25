type Product = {
    name: string;
    subName: string;
    id: string;
    description: string;
    iconUrl: string;
    amount: number;
    isBestSeller: boolean;
    category: {
        code: string;
    }
    options: {
        currency: string;
        maxCoverage: number;
        vehicleTypes: string[];
        durationMonths: number[];
    } | any;
    provider: {
        name: string;
        logoUrl: string;
    };
};
import defaultImg from "@/assets/default.jpg";
import { useNavigate } from "react-router-dom";
export const ProductCard = ({ item }: { item: Product }) => {
    const nav = useNavigate()
    const formatPrice = (price: number) =>
        price.toLocaleString("uz-UZ") + " so'm";

    return (
        <div onClick={() => nav("/product/" + item.id)} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition duration-300 flex flex-col h-full min-h-[340px]">

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                    <img
                        src={item.iconUrl || defaultImg}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = defaultImg;
                        }}
                        className="w-10 h-10 object-contain"
                    />

                    <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                            {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">{item.subName}</p>
                    </div>
                </div>

                {item.isBestSeller && (
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded">
                        TOP
                    </span>
                )}
            </div>
            {/* Provider */}
            <div className="flex items-center gap-2 mt-3 border rounded-sm py-1 px-2">
                <img
                    src={item.provider.logoUrl || defaultImg}
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = defaultImg;
                    }}
                    className="w-5 h-5 object-contain"
                />
                <span className="text-xs text-gray-600">
                    {item.provider.name}
                </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {item.description}
            </p>

            {/* Info Grid */}
            {item.options?.durationMonths && item?.category.code !== 'accident' && <div className="grid grid-cols-2 gap-3 mt-4 text-md">
                <div>
                    <p className="text-gray-400">Qoplama</p>
                    <p className="font-medium text-gray-700">
                        {(item.options.maxCoverage / 1_000_000).toFixed(0)} mln
                    </p>
                </div>

                <div>
                    <p className="text-gray-400">Muddat</p>
                    <p className="font-medium text-gray-700">
                        {/* {item.options?.durationMonths && item.options?.durationMonths.join(", ")} oy */}
                    </p>
                </div>

                {item.options?.vehicleTypes && <div className="col-span-2">
                    <p className="text-gray-400">Transport</p>
                    <p className="font-medium text-gray-700">
                        {item.options.vehicleTypes.map((item: string) => item).join(", ")}
                    </p>
                </div>}
            </div>}
            {
                <div className="grid grid-cols-2 gap-3 mt-4 text-md">

                    {/* Deductible */}
                    {item.options?.deductible && (
                        <div>
                            <p className="text-gray-400">Franshiza</p>
                            <p className="font-medium text-gray-700">
                                {item.options.deductible.toLocaleString()} so'm
                            </p>
                        </div>
                    )}

                    {/* Coverage Types */}
                    {item.options?.coverageTypes && (
                        <div className="col-span-2">
                            <p className="text-gray-400">Qamrov</p>
                            <p className="font-medium text-gray-700">
                                {item.options.coverageTypes.map((item: string) => item).join(", ")}
                            </p>
                        </div>
                    )}
                </div>
            }
            {/* 🔥 Bottom (Always at bottom) */}
            <div className="mt-auto pt-5 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400">Narxi</p>
                    <p className="text-base font-semibold text-blue-600">
                        {formatPrice(item.amount)}
                    </p>
                </div>

                <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                    Tanlash
                </button>
            </div>
        </div>
    );
};
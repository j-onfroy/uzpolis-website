import defaultImg from "@/assets/default.jpg";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Product = {
  name: string;
  subName: string;
  id: string;
  description: string;
  iconUrl: string;
  amount: number;
  isBestSeller: boolean;
  category: { code: string };
  options: {
    currency?: string;
    maxCoverage?: number;
    vehicleTypes?: string[];
    durationMonths?: number[];
    deductible?: number;
    coverageTypes?: string[];
  } | any;
  provider: { name: string; logoUrl: string };
};

export const ProductCard = ({ item }: { item: Product }) => {
  const nav = useNavigate();
  const isAccident = item.category?.code === "accident";

  return (
    <div
      // onClick={() => nav("/product/" + item.id)}
      onClick={() => nav("/register")}

      className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100 hover:shadow-md transition cursor-pointer flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={item.iconUrl || defaultImg}
              alt={item.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = defaultImg;
              }}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
            {item.subName && (
              <p className="text-xs text-gray-500">{item.subName}</p>
            )}
            {item.isBestSeller && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-600 mt-1 inline-block">
                MASHHUR
              </span>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-base font-bold text-gray-900">
            {item.amount.toLocaleString("uz-UZ")}
          </p>
          <p className="text-xs text-gray-500">so'm</p>
        </div>
      </div>

      {/* Provider */}
      {item.provider?.name && (
        <div className="flex items-center gap-2 mt-3 bg-gray-50 rounded-lg py-1.5 px-3">
          <img
            src={item.provider.logoUrl || defaultImg}
            alt={item.provider.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = defaultImg;
            }}
            className="w-5 h-5 object-contain"
          />
          <span className="text-xs text-gray-600">{item.provider.name}</span>
        </div>
      )}

      <div className="border-t border-gray-100 my-3" />

      {/* Features */}
      <div className="flex flex-col gap-2 flex-1">
        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-1">
            {item.description}
          </p>
        )}

        {!isAccident && (item.options?.maxCoverage ?? 0) > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check size={14} className="text-blue-500 flex-shrink-0" />
            {(item.options.maxCoverage / 1_000_000).toFixed(0)} mln so'mgacha qoplama
          </div>
        )}

        {item.options?.vehicleTypes?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check size={14} className="text-blue-500 flex-shrink-0" />
            {item.options.vehicleTypes.join(", ")}
          </div>
        )}

        {item.options?.coverageTypes?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check size={14} className="text-blue-500 flex-shrink-0" />
            {item.options.coverageTypes.join(", ")}
          </div>
        )}

        {(item.options?.deductible ?? 0) > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check size={14} className="text-blue-500 flex-shrink-0" />
            Franshiza: {item.options.deductible.toLocaleString()} so'm
          </div>
        )}
      </div>

      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition">
        Tanlash <span>→</span>
      </button>
    </div>
  );
};

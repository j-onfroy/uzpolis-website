import { useSubUrlCategory } from "@/store/useCategory";
import { Check, Loader, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import empty from "@/assets/empty.webp";
import defaultImg from "@/assets/icons/doc.svg";

const BADGE_STYLES: Record<string, string> = {
  "ENG ARZON": "bg-blue-100 text-blue-600",
  TAVSIYA: "bg-teal-100 text-teal-600",
  MASHHUR: "bg-orange-100 text-orange-600",
};

function getBadgeStyle(badge: string): string {
  return BADGE_STYLES[badge] ?? "bg-gray-100 text-gray-600";
}

export default function SubCategory() {
  const location = useLocation();
  const nav = useNavigate();
  const slug = location.pathname
    .replace(/^\/category\/sub/, "")
    .replace(/^\/+/, "");

  const { data: dataSub, isLoading, isError } = useSubUrlCategory(slug);

  if (!slug) return <div className="p-4">Invalid URL</div>;

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin" size={50} />
      </div>
    );
  }

  if (isError || !dataSub?.data) {
    return <div className="p-4">Data not found</div>;
  }

  const data = dataSub.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner Section */}
      <div className="relative bg-slate-900 overflow-hidden border-b border-slate-800">
        {/* Orqa fondagi zamonaviy to'r (Grid) Pattern */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Zamonaviy Neon yog'du effektlari (Glow Effects) */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-pulse duration-4005" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full filter blur-[128px] opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

              {/* Chap tomon: Matnlar qismi */}
              <div className="space-y-4 max-w-3xl">
                {/* Kategoriya Badge - Nozik shisha effekti bilan */}
                {data.subName && (
                  <div className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-white/80 text-xs font-medium tracking-wide uppercase">{data.subName}</span>
                  </div>
                )}

                {/* Asosiy Sarlavha - Katta va jozibali */}
                <h1 className="text-[26px] md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                  {data.name}
                </h1>

                {/* Tavsif - Rang sal xiralashtirilgan, o'qishga qulay */}
                {data.description && (
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {data.description}
                  </p>
                )}
              </div>

              {/* O'ng tomon: Zamonaviy Statistika vidjeti */}
              <div className="flex justify-center md:justify-end shrink-0">
                {/* <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 min-w-[140px] text-center shadow-2xl shadow-black/20">
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    {data.subCategories?.length || 0}
                  </div>
                </div> */}
              </div>
              <div>
              {/* <img  src={defaultImg} width={340} className=" absolute bottom-[-30px] right-0 rotate-3" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {data.subCategories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <img src={empty} alt="No data" className="w-48 h-48 object-contain mb-6" />
            <p className="text-gray-500 text-lg font-medium">Hech qanday subkategoriya topilmadi</p>
            <p className="text-gray-400 text-sm mt-2">Iltimos, keyinroq qaytib ko'ring</p>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.subCategories.map((item, index) => {
            const isFeatured = index === 0 && !item.disabled;
            const price = item.amount ?? item.minAmount;
            const features = item.features ?? [];

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${item.disabled ? "opacity-60" : "hover:-translate-y-1"
                  } ${isFeatured ? "ring-2 ring-blue-500 shadow-lg" : "border border-gray-100"}`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      TOP
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.iconUrl || defaultImg}
                          alt={item.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = defaultImg;
                          }}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {item.name}
                        </h3>
                        {item.badge && (
                          <span
                            className={`text-[14px] font-bold px-2.5 py-1 rounded-full mt-1.5 inline-block ${getBadgeStyle(item.badge)}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {price != null && (
                      <div className="text-right flex-shrink-0 ml-3">
                        <p className="text-xl font-bold text-gray-900">
                          {price.toLocaleString("uz-UZ")}
                        </p>
                        <p className="text-xs text-gray-500">so'm</p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="border-t border-gray-100 my-4" />

                  <div className="min-h-[100px]">
                    {features.length > 0 ? (
                      <ul className="space-y-2">
                        {features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                        {features.length > 4 && (
                          <li className="text-xs text-gray-400 pl-6">
                            +{features.length - 4} more
                          </li>
                        )}
                      </ul>
                    ) : (
                      item.description && (
                        <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                      )
                    )}
                  </div>

                  {/* Action Button */}
                  {item.disabled ? (
                    <div className="mt-5 w-full text-center text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-xl py-3 font-medium">
                      Tez orada
                    </div>
                  ) : (
                    <button
                      onClick={() => nav(`/service/${item.id}/${item.slug}`)}
                      className="mt-5 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:shadow-md"
                    >
                      Tanlash
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
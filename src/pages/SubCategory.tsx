import { useSubUrlCategory } from "@/store/useCategory";
import { Loader } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SubCategory() {
  const location = useLocation();
  const nav = useNavigate()
  const slug = location.pathname
    .replace(/^\/category\/sub/, "")
    .replace(/^\/+/, "");

  const { data: dataSub, isLoading, isError } = useSubUrlCategory(slug);
  if (!slug) {
    return <div className="p-4">Invalid URL</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin" size={50} />
      </div>
    );
  }

  if (isError || !dataSub.data) {
    return <div className="p-4">Data not found</div>;
  }

  const data = dataSub.data;

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-20 md:pt-20">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-md">
        <img
          src={data.bannerUrl}
          alt="banner"
          className="w-full h-40 md:h-24 object-cover"
        />
        <div className="absolute inset-0 bg-[#1b98e0] flex flex-col justify-end p-4 text-white">
          <h1 className="text-xl md:text-3xl font-bold">{data.name}</h1>
          <p className="text-sm md:text-base opacity-90">
            {data.subName}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700 text-sm md:text-base">
        {data.description}
      </p>

      {/* Subcategories */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.subCategories.map((item: any, index: number) => (
          <div
            key={index}
            onClick={()=>nav(`/service/${item.id}/${item.slug}`)}
            className={` cursor-pointer rounded-2xl p-4 shadow-sm border bg-white transition hover:shadow-md ${
              item.disabled ? "opacity-50" : ""
            }`}
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {item.description}
            </p>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {item.productCount} ta mahsulot
              </span>

              {item.disabled ? (
                <span className="text-xs text-red-500">Tez orada</span>
              ) : (
                <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                  Ko'rish
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
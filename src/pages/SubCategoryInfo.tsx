import { ProductCard } from "@/components/ProductCard";
import { useSubCategoryInfo } from "@/store/useCategory";
import { useProductUrl } from "@/store/useProduct";
import { Loader, ShieldBan } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import empty from "@/assets/empty.webp";
// import defaultImg from "@/assets/default.jpg";
import { useTranslation } from "react-i18next";

function SubCategoryInfo() {
  const { id, subSlog } = useParams();
  const { t } = useTranslation();

  const { data: dataSub, isLoading, isError } = useSubCategoryInfo(id);
  const {
    data: dataProduct,
    isLoading: productLoad,
    isError: productError,
  } = useProductUrl(subSlog);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin" size={50} />
      </div>
    );
  }

  if (isError || !dataSub?.data) {
    return <div className="p-4">{t("data_not_found")}</div>;
  }

  const data = dataSub.data;
  const productsItem = dataProduct?.data;

  return (
    <div className="max-w-5xl sm:mb-40 md:mb-2 mt-2 mx-auto px-4 pb-10">
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {/* <img
              src={data.iconUrl || defaultImg}
              alt={data.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = defaultImg;
              }}
              className="w-10 h-10 object-contain"
            /> */}
            <ShieldBan />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">
              {data.name}
            </h1>
            {data.category?.name && (
              <p className="text-sm text-gray-500">{data.category.name}</p>
            )}
          </div>
        </div>

        <div className="flex-1" />

        {data.productCount > 0 && (
          <span className="self-start sm:self-auto text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">
            {data.productCount} ta mahsulot
          </span>
        )}
      </div>

      {/* Description */}
      {data.description && (
        <p className="mt-4 text-gray-600 text-sm leading-relaxed px-1">
          {data.description}
        </p>
      )}

      {/* Products */}
      <div className="mt-6">
        {productLoad && (
          <div className="flex justify-center mt-10">
            <Loader className="animate-spin" size={40} />
          </div>
        )}

        {!productLoad && (productError || !productsItem) && (
          <div className="text-center text-gray-500 mt-10">{t("data_not_found")}</div>
        )}

        {!productLoad && productsItem?.length === 0 && (
          <div className="flex flex-col items-center mt-10">
            <img src={empty} alt="" className="w-40 h-40 object-contain mb-3" />
            <p className="text-gray-500">{t("insurance_not_found")}</p>
          </div>
        )}

        {!productLoad && productsItem && productsItem.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsItem.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubCategoryInfo;

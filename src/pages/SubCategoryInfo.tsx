import { ProductCard } from "@/components/ProductCard";
import { useSubCategoryInfo } from "@/store/useCategory";
import { useProductUrl } from "@/store/useProduct";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom"
import empty from "@/assets/empty.webp"
import { useTranslation } from "react-i18next";
type ApiResponse = {
  success: boolean;
  data: {
    name: string;
    description: string;
    iconUrl: string;
    productCount: number;
    category: {
      name: string;
      iconUrl: string;
    };
    createdAt: string;
  };
};
function SubCategoryInfo() {
  const { id, subSlog } = useParams();
   const {t} = useTranslation();
  const { data: dataSub, isLoading, isError } = useSubCategoryInfo(id);
  const { data: dataProduct, isLoading: ProductLoad, isError: productError } = useProductUrl(subSlog);


  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin" size={50} />
      </div>
    );
  }

  if (isError || !dataSub.data) {
    return <div className="p-4">{t("data_not_found")}</div>;
  }
  window.scrollTo(0, 0)
  const data = dataSub.data;
  const productsItem = dataProduct?.data;

  return (
    <div className="max-w-5xl sm:mb-40 md:mb-2 mt-20 mx-auto mb-40 sm:bg-gray-100 md:bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">

      {/* Top */}
      <div className="flex bg-white pt-2 px-2 rounded-md flex-col sm:flex-row sm:items-center gap-4">

        {/* Icon */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-3 rounded-xl">
            <img src={data.iconUrl} className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-800">
              {data.name}
            </h1>
            <p className="text-sm text-gray-500">
              {data.category.name}
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Badge */}
        <span className="self-start sm:self-auto text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg">
          {data.productCount} ta mahsulot
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
        {data.description}
      </p>

      {/* Bottom Info */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t pt-4">

        {/* Date */}
        {/* <p className="text-xs text-gray-400">
          Yaratilgan: {new Date(data.createdAt).toLocaleDateString()}
        </p> */}

        {/* Action */}
        {/* <button className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
          Batafsil ko‘rish
        </button> */}
      </div>
      <br />
      {dataProduct?.data && !productsItem.length &&
      <div className=" w-full text-center">
        <img src={empty} alt="" className="w-48 m-auto" />
        {t('insurance_not_found')}
      </div>
      }
      <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-4 sm:gap-6
    ">
        {ProductLoad && <div className="flex justify-center mt-20">
          <Loader className="animate-spin" size={50} />
        </div>}
        {productError || !productsItem ? 
        <div>No data</div>
        :
        productsItem.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

export default SubCategoryInfo

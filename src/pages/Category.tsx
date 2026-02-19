import { useCategory } from "@/store/useCategory";
import { ChevronRight, Loader } from "lucide-react";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
type CategoryType = {
  id: string,
  code: string,
  name: string,
  subName: string,
  description: string,
  iconUrl: string,
  bannerUrl: string,
  slug: string,
  sortOrder: number,
  isActive: boolean,
  visible: string,
  disabled: boolean,
  subCategoryCount: number,
  productCount: number,
  createdAt: string
}
function Category() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const { data, isLoading } = useCategory();
  return (
    <div className="min-h-screen  mb-20 sm:items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-3 sm:px-4 pt-16 sm:pt-0 pb-6">
      <h2 className="w-full text-center text-lg font-semibold text-gray-800 mb-4">Category</h2>
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-2 gap-4">
        {isLoading ?
          <div>
            <Loader className=" animate-spin " />
          </div>
          : data.map((item: CategoryType, i: number) => (
            <div
              key={i + 1}
              onClick={()=> nav(item.slug)}
              className="bg-white rounded-xl p-5 w-full shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-md">{item.name}</p>
                <ChevronRight color="hsl(199 89% 48%)" className="" />

              </div>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {item.subName}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Category

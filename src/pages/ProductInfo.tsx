
import img from "@/assets/default.jpg"
import { useProductInfo, useProductsList } from "@/store/useProduct";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { User, CheckCircle2, CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
    { title: "Ma'lumot", icon: User },
    { title: "Tasdiqlash", icon: CheckCircle2 },
    { title: "To'lov", icon: CreditCard },
]
function Stepper({ currentStep = 0 }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={index} className="flex items-center flex-1">

                            {/* Left Connector (not for first step) */}
                            {index !== 0 && (
                                <div
                                    className={`flex-1 h-[2px] transition-colors duration-300
                        ${index <= currentStep ? "bg-blue-600" : "bg-gray-200"}`}
                                />
                            )}

                            {/* Step Circle */}
                            <div className="flex flex-col items-center relative z-10">
                                <div
                                    className={`
                          w-8 h-8 flex items-center justify-center rounded-full
                          transition-all duration-300
                          ${isCompleted
                                            ? "bg-blue-600 text-white"
                                            : isActive
                                                ? "bg-white text-blue-600 border-2 border-blue-600"
                                                : "bg-gray-100 text-gray-400"
                                        }
                        `}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 size={18} />
                                    ) : (
                                        <Icon size={16} />
                                    )}
                                </div>

                                <span
                                    className={`mt-2 text-sm font-medium transition-colors
                        ${isActive
                                            ? "text-blue-600"
                                            : isCompleted
                                                ? "text-gray-800"
                                                : "text-gray-400"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </div>

                            {/* Right Connector (not for last step) */}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`flex-1 h-[2px] transition-colors duration-300
                        ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export const ProductInfo = () => {
    const { productId } = useParams()
    const isMobile = useIsMobile()
    const { data, isLoading, isError } = useProductInfo(productId)
    const { data: productList, isLoading: productListLoad } = useProductsList()
    console.log(data, "data")
    window.scrollTo(0, 0)
    if (isLoading) {
        return (
            <div className="flex justify-center mt-20">
                <Loader className="animate-spin" size={50} />
            </div>
        );
    }

    if (isError || !data.data) {
        return <div className="p-4">Data not found</div>;
    }
    const item = data.data;
    return (
        <div className="max-w-7xl mt-20 mb-20 mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-100">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6 bg-gray-100">
                <Stepper currentStep={0} />
                {isMobile &&
                    <div className="bg-white rounded-3xl  border border-gray-200 h-fit sticky  space-y-5">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4  mt-1 mx-1 w-full rounded-2xl p-2 bg-gray-50">
                                <img
                                    src={item.iconUrl || img}
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = img;
                                    }}
                                    className="w-16 h-16 rounded-xl object-contain bg-white p-2"
                                />

                                <div className="flex-1">
                                    <p className="font-semibold text-sm">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.subName}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <img
                                            src={item.provider.logoUrl}
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span className="text-xs text-gray-500">
                                            {item.provider.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex  px-3 pb-3 justify-between text-xl font-semibold text-blue-600">
                            <span>Jami</span>
                            <span>{item.amount.toLocaleString()} so'm</span>
                        </div>
                    </div>
                }
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6">
                        Sug'urta oluvchi ma'lumotlari
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Davlat raqami */}
                        <div className="col-span-1 md:col-span-1">
                            <label className="text-sm text-gray-600">
                                Davlat raqami *
                            </label>
                            <input
                                placeholder="A001AA77"
                                className="mt-2 w-full border rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Passport */}
                        <div className="col-span-1 md:col-span-1 flex gap-2">
                            <div className="w-20">
                                <label className="text-sm text-gray-600">Seriya</label>
                                <input
                                    placeholder="AAF"
                                    className="mt-2 w-full border rounded-xl px-3 py-3 bg-gray-50"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm text-gray-600">Raqam</label>
                                <input
                                    placeholder="0000000"
                                    className="mt-2 w-full border rounded-xl px-4 py-3 bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Drivers */}
                        <div className="col-span-1 md:col-span-1">
                            <label className="text-sm text-gray-600">
                                Haydovchilar soni
                            </label>
                            <select className="mt-2 w-full border rounded-xl px-4 py-3 bg-gray-50">
                                <option>Cheklanmagan</option>
                                <option>1-2</option>
                                <option>3-5</option>
                            </select>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className="mt-8 flex justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl text-lg font-medium shadow">
                            Qo'shish
                        </button>
                    </div>
                </div>

                {/* 🖼 SECOND BLOCK (optional image/info card like you asked) prdoucttsss */}
                <h4 className=" mt-20">Qoshimcha takliflar</h4>
                {
                    productListLoad &&
                    <div className=" w-full text-center">
                        <Loader size={20} className=" animate-spin m-auto" />
                    </div>
                }
                {
                    productList?.data?.length === 0 ?
                        <div>Hozircha yo'q</div>
                        :
                        productList?.data.map((elements) => (
                            <div key={elements.id} className=" relative bg-gradient-to-br border mt-[-10px]  bg-white rounded-3xl p-6  pb-8">
                                <div className=" flex items-center gap-4">
                                    <img
                                        src={elements.iconUrl || img}
                                        className="w-16 h-16"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = img;
                                        }}
                                    />
                                    <div>
                                        <h3 className="font-semibold">{elements.name}</h3>
                                        <p className="text-sm text-gray-500">{elements.description}</p>
                                    </div>
                                </div>
                                <h3 className="mb-1 absolute right-4 bottom-3">{elements.amount.toLocaleString()} so'm</h3>
                            </div>
                        )).splice(0, 4)
                }


            </div>

            {/* RIGHT SIDE (CART / SUMMARY) */}
            {!isMobile && <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 h-fit sticky top-4 space-y-5">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">
                            Sug'urta ma'lumotlari
                        </h3>
                        <p className="text-xs text-gray-500">
                            {item.category.name}
                        </p>
                    </div>

                    {item.isBestSeller && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                            Eng mashhur
                        </span>
                    )}
                </div>

                {/* PRODUCT */}
                <div className="flex gap-4 border rounded-2xl p-4 bg-gray-50">
                    <img
                        src={item.iconUrl || img}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = img;
                        }}
                        className="w-16 h-16 rounded-xl object-contain bg-white p-2"
                    />

                    <div className="flex-1">
                        <p className="font-semibold text-sm">
                            {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {item.subName}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                            <img
                                src={item.provider.logoUrl}
                                className="w-5 h-5 object-contain"
                            />
                            <span className="text-xs text-gray-500">
                                {item.provider.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* COVERAGE INFO */}
                {/* <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Sug'urta summasi</p>
                        <p className="font-semibold text-blue-600">
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500">Muddati</p>
                        <p className="font-semibold">
                            {item.options.durationMonths} oy
                        </p>
                    </div>
                </div> */}

                {/* COVERAGE TYPES */}
                {/* <div>
                    <p className="text-xs text-gray-500 mb-2">Qamrovi:</p>
                    <div className="flex flex-wrap gap-2">
                        {item.options?.types ? item.options?.types.map((type: string) => (
                            <span
                                key={type}
                                className="text-xs bg-gray-100 px-3 py-1 rounded-full capitalize"
                            >
                                {type}
                            </span>
                        ))
                            :
                            <p>no info</p>
                        }
                    </div>
                </div> */}

                {/* PRICE SECTION */}
                <div className="border-t pt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Sug'urta narxi</span>
                        <span>{item.amount.toLocaleString()} so'm</span>
                    </div>

                    <div className="flex justify-between text-xl font-semibold text-blue-600">
                        <span>Jami</span>
                        <span>{item.amount.toLocaleString()} so'm</span>
                    </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-[#0077b6] hover:opacity-90 transition text-white py-3 rounded-2xl font-medium shadow-md">
                    Rasmiylashtirishga o'tish
                </button>

                {/* FOOTER NOTE */}
                <p className="text-[11px] text-gray-400 text-center">
                    Sug'urta muddati davomida hodisa yuz bersa, 40 mln so'mgacha to'lov amalga oshiriladi.
                </p>

            </div>}
        </div>
    );
};
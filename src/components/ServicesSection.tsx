import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCategory } from "@/store/useCategory";
import { useNavigate } from "react-router-dom";
import car from "@/assets/icons/car.svg"
import shitt from "@/assets/icons/shitt.png"
import trevel from "@/assets/icons/trevel.svg"
import hear from "@/assets/icons/hear.svg"
import home from "@/assets/icons/home.svg"
import doc from "@/assets/icons/doc.svg"
import save from "@/assets/icons/save.svg"
const services = [
  {
    icon: car,
    title: "Е-ОСАГО",
    description: "Электронный полис ОСАГО за 5 минут. Сравните цены от 15+ страховых компаний.",
    price: "от 3 500 ₽",
    popular: true,
  },
  {
    icon: trevel,
    title: "КАСКО",
    description: "Полная защита вашего автомобиля от угона, ДТП и повреждений.",
    price: "от 15 000 ₽",
    popular: false,
  },
  {
    icon: save,
    title: "ДМС",
    description: "Добровольное медицинское страхование для вас и вашей семьи.",
    price: "от 8 000 ₽",
    popular: false,
  },
  {
    icon: home,
    title: "Страхование имущества",
    description: "Защита квартиры, дома и имущества от непредвиденных ситуаций.",
    price: "от 2 500 ₽",
    popular: false,
  },
  {
    icon: hear,
    title: "Для путешествий",
    description: "Страховка для выезжающих за рубеж с покрытием медицинских расходов.",
    price: "от 500 ₽",
    popular: false,
  },
  {
    icon: doc,
    title: "Для бизнеса",
    description: "Комплексные решения для защиты бизнеса и сотрудников.",
    price: "по запросу",
    popular: false,
  },
  {
    icon: doc,
    title: "Для бизнеса",
    description: "Комплексные решения для защиты бизнеса и сотрудников.",
    price: "по запросу",
    popular: false,
  },
  {
    icon: doc,
    title: "Для бизнеса",
    description: "Комплексные решения для защиты бизнеса и сотрудников.",
    price: "по запросу",
    popular: false,
  },
];
type TabType = {
  bannerUrl: string
  code: string
  createdAt: string
  description: string
  disabled: boolean
  iconUrl: string
  id: string
  isActive: boolean
  name: string;
  productCount: number
  slug: string
  sortOrder: number
  subCategoryCount: number
  subName: string
  visible: string
}
const ServicesSection = () => {
  // const data = QueryClient.getQueryData(["category"]);
  const { data, isLoading } = useCategory();
  // const { data: dataSub, isLoading: isSubLoading } = useSubCategory(activeTab);
  const { t } = useTranslation()
  const nav = useNavigate()
  const handleClick = (slug: string) => {
    nav("/category/sub/" + slug)
  }
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-[1216px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[24px] font-bold text-ink tracking-tight"> {t("services.title1")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("services.title3")}
            </p>
          </div>
        </div>
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 md:px-28">
          {
            !data?.data ?
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-700">Ma'lumot topilmadi</p>
                <p className="text-xs text-muted-foreground mt-1">Hozircha xizmatlar mavjud emas</p>
              </div>
              :
              data?.data.map((service: TabType, index: number) => {
                const Icon = services[index]?.icon;
                return (
                  // <div
                  //   key={index}
                  //   onClick={() => handleClick(service.slug)}
                  //   className={`group cursor-pointer relative bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                  //   style={{ animationDelay: `${index * 0.1}s` }}
                  // >
                  //   {/* Icon */}
                  //   <div className="w-14 h-14 rounded-xl gradient-hero-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  //     {Icon && <Icon className="w-6 h-6" />}
                  //   </div>
                  //   {/* Content */}
                  //   <h3 className="text-xl font-bold text-foreground mb-3">{service.name}</h3>
                  //   <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  //     {service.description}
                  //   </p>

                  //   {/* Price */}
                  //   <div className="flex  w-full items-center justify-between pt-4 border-t border-border">
                  //     <Button onClick={() => handleClick(service.slug)} variant="ghost" size="sm" className="text-primary  ">
                  //       {t("services.more")}
                  //       <ChevronRight className="w-4 h-4" />
                  //     </Button>
                  //   </div>
                  // </div>
                  <div
                    key={index}
                    onClick={() => handleClick(service.slug)}
                    className="group cursor-pointer relative bg-white dark:bg-card rounded-[24px] p-4 flex items-center justify-between border border-border shadow-sm hover:shadow-md transition-all duration-300 translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Orqa fondagi yuqori o'ng burchakdagi dekorativ shakl */}
                    {/* <div className="absolute -top-3 -right-3 w-[100px] h-20 bg-[#E8EBFD] dark:bg-indigo-950/40 rounded-2xl -z-10 pointer-events-none transform rotate-6 transition-transform scale-105" /> */}

                    {/* Chap va o'rta qism (Ikonka + Matnlar) */}
                    <div className="flex items-center gap-5">

                      {/* Ikonka konteyneri (Rasmda och ko'k fonda) */}
                      <div className=" relative w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl  dark:bg-indigo-950/60 group-hover:scale-105 transition-transform duration-300">
                        {/* {Icon ? (
                          <Icon className="w-8 h-8 text-[#3B82F6]" />
                        ) : (
                          <img src="/path-to/Group.png" alt={service.name} className="w-10 h-10 object-contain" />
                        )} */}
                        <div className="absolute -top-3 -left-[-14px] w-[100px] h-20  dark:bg-indigo-950/40 rounded-2xl -z-10 pointer-events-none transform rotate-6 transition-transform scale-105" >
                          <img src={shitt} alt="" />
                        </div>

                        <img src={Icon} alt="" />
                      </div>

                      {/* Matnlar qismi */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-foreground">
                          {service.name}
                        </h3>
                        <p className="text-[#64748B] dark:text-muted-foreground text-sm leading-relaxed max-w-sm md:max-w-md line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* O'ng tarafdagi to'q sariq aylana tugma */}
                    <div className="ml-4 shrink-0">
                      <div
                        className="w-10 h-10 rounded-full bg-[#F5A642] hover:bg-[#e09536] flex items-center justify-center text-white transition-all duration-200 shadow-sm group-hover:translate-x-1"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                )
              }
              )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

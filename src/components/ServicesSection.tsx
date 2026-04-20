import { Car, Shield, Heart, Home, Plane, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { QueryClient } from "@tanstack/react-query";
import { useCategory, useSubCategory } from "@/store/useCategory";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Car,
    title: "Е-ОСАГО",
    description: "Электронный полис ОСАГО за 5 минут. Сравните цены от 15+ страховых компаний.",
    price: "от 3 500 ₽",
    popular: true,
  },
  {
    icon: Plane,
    title: "КАСКО",
    description: "Полная защита вашего автомобиля от угона, ДТП и повреждений.",
    price: "от 15 000 ₽",
    popular: false,
  },
  {
    icon: Heart,
    title: "ДМС",
    description: "Добровольное медицинское страхование для вас и вашей семьи.",
    price: "от 8 000 ₽",
    popular: false,
  },
  {
    icon: Home,
    title: "Страхование имущества",
    description: "Защита квартиры, дома и имущества от непредвиденных ситуаций.",
    price: "от 2 500 ₽",
    popular: false,
  },
  {
    icon: Shield,
    title: "Для путешествий",
    description: "Страховка для выезжающих за рубеж с покрытием медицинских расходов.",
    price: "от 500 ₽",
    popular: false,
  },
  {
    icon: Briefcase,
    title: "Для бизнеса",
    description: "Комплексные решения для защиты бизнеса и сотрудников.",
    price: "по запросу",
    popular: false,
  },
  {
    icon: Briefcase,
    title: "Для бизнеса",
    description: "Комплексные решения для защиты бизнеса и сотрудников.",
    price: "по запросу",
    popular: false,
  },
  {
    icon: Briefcase,
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
  const handleClick = (slug:string) =>{
    nav("/category/sub/" + slug)
  }
  return (
    <section id="services" className="py-20 mt-[-100px] lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            {t("services.title1")}
          </span>{" "}
          <br />
          <h2 className=" ml-1 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("services.title2")}
            <span className="text-gradient"> {" "}
              {t("services.title2_1")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("services.title3")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 md:px-28">
          {
            !data?.data ?
              <p>No data</p>
              :
              data?.data.map((service: TabType, index: number) => {
                const Icon = services[index]?.icon;
                return (
                  <div
                    key={index}
                    onClick={()=>handleClick(service.slug)}
                    className={`group cursor-pointer relative bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl gradient-hero-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {/* {services[index] ? services[index].icon : ''} */}
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="flex  w-full items-center justify-between pt-4 border-t border-border">
                      {/* <span className="text-lg font-bold text-primary">{service.productCount}</span> */}
                      <Button onClick={()=>handleClick(service.slug)} variant="ghost" size="sm" className="text-primary  ">
                        {t("services.more")}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
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

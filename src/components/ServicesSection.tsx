import { Car, Shield, Heart, Home, Plane, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { QueryClient } from "@tanstack/react-query";

const services = [
  {
    icon: Car,
    title: "Е-ОСАГО",
    description: "Электронный полис ОСАГО за 5 минут. Сравните цены от 15+ страховых компаний.",
    price: "от 3 500 ₽",
    popular: true,
  },
  {
    icon: Shield,
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
    icon: Plane,
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
];

const ServicesSection = () => {
  // const data = QueryClient.getQueryData(["category"]);
  const { t } = useTranslation()
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${service.popular ? "ring-2 ring-primary" : ""
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 gradient-hero text-primary-foreground text-xs font-semibold rounded-full">
                  {t("services.popular")}
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-hero-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

              {/* Price */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-lg font-bold text-primary">{service.price}</span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  {t("services.more")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

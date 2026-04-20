import { Clock, BadgePercent, HeadphonesIcon, ShieldCheck, FileCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const benefits = [
  {
    icon: Clock,
    title: "Быстрое оформление",
    description: "Получите полис за 5 минут без визита в офис. Всё онлайн.",
  },
  {
    icon: BadgePercent,
    title: "Выгодные цены",
    description: "Сравниваем предложения от 15+ компаний и находим лучшую цену для вас.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка 24/7",
    description: "Наши специалисты всегда на связи и готовы помочь в любой ситуации.",
  },
  {
    icon: ShieldCheck,
    title: "Надёжные партнёры",
    description: "Работаем только с проверенными страховыми компаниями с высоким рейтингом.",
  },
  {
    icon: FileCheck,
    title: "Простые выплаты",
    description: "Помогаем с оформлением документов для быстрого получения выплат.",
  },
  {
    icon: Zap,
    title: "Мгновенная доставка",
    description: "Полис приходит на email сразу после оплаты. Печатать не нужно.",
  },
];

const BenefitsSection = () => {
  const { t } = useTranslation()
  const values = t("benefit.list", { returnObjects: true });
  console.log(values, "values")
  return (
    <section id="benefits" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            {t("benefit.title1")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("benefit.title2")}

            <span className="text-gradient"> {t("benefit.title2_1")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("benefit.title3")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-28">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group flex gap-4 p-6 bg-card rounded-2xl border border-border hover:border-primary/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-hero flex items-center justify-center transition-transform duration-300">
                <benefit.icon className="w-6 h-6 text-primary-foreground" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{values[index]?.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{values[index]?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        {/* <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "500K+", label: t("benefit.customers") },
            { value: "15+", label: t("benefit.companies") },
            { value: "5 мин", label: t("benefit.avg_time") },
            { value: "98%", label: t("benefit.positive_reviews") },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-extrabold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default BenefitsSection;

import { Search, FileText, CreditCard, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Выберите тип страхования",
    description: "Укажите, какой полис вам нужен: ОСАГО, КАСКО, ДМС или другой вид страхования.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Заполните данные",
    description: "Введите информацию о себе и объекте страхования. Это займёт всего 2-3 минуты.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Сравните и оплатите",
    description: "Получите предложения от разных компаний, выберите лучшее и оплатите онлайн.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Получите полис",
    description: "Электронный полис придёт на вашу почту мгновенно. Он имеет полную юридическую силу.",
  },
];

const HowItWorksSection = () => {
  
  const { t } = useTranslation()
  const values = t("steps", { returnObjects: true });
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            {t("how_work.title1")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("how_work.title2")}
            <span className="text-gradient"> {t("how_work.title2_1")} </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("how_work.title3")}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step card */}
                <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-hero-light flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{values[index].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{values[index].description}</p>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 text-primary/30">
                    {/* <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

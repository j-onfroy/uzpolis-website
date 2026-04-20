import { useTranslation } from "react-i18next";
import logo from "@/assets/8.png";
const companies = [
  { name: "SQB Insurance", discount: 100, color: "hsl(174 42% 41%)" },
];

const CompanyList = () => {
  const { t } = useTranslation();
  return (<div className="space-y-1">
    <h3 className="text-lg font-semibold text-foreground mb-4">{t("home.company")}:</h3>
    {companies.map((c, i) => (
      <div
        key={c.name}
        className="flex items-center justify-between p-4 rounded-xl hover-lift cursor-pointer bg-card border border-border/30 hover:border-primary/20"
        style={{ animationDelay: `${i * 60}ms` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: c.color + "20", color: c.color }}
          >
            <img src={logo} alt="" />
          </div>
          <span className="font-medium text-foreground">{c.name}</span>
        </div>
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke={c.color} strokeWidth="2.5"
              strokeDasharray={`${c.discount * 94.2 / 100} 94.2`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
            {c.discount}%
          </span>
        </div>
      </div>
    ))}
    {/* <p className="text-xs text-muted-foreground pt-3">
      *Компании сортируются по охвату продаваемых страховых полисов и выплаты страховых возмещений клиентам
    </p> */}
  </div>)
};

export default CompanyList;

import { useEffect, useState } from "react";
import {  CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-illustration2.png";
import InsuranceForm from "./InsuranceForm";
import CompanyList from "./CompanyList";
import Header from "./Header";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("ОСАГО");
  const [activeSub, setActiveSub] = useState("ed966f96-cc14-4a88-80b9-010db3f32d38");

  const [isSpecialVehicle, setIsSpecialVehicle] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [driversCount, setDriversCount] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { t } = useTranslation();
  const tabs = [{label:t("form.osago_title"), value:"ОСАГО"}, {label:t("form.kasko_title"), value:"КАСКО"},{label:t("form.travel_title"), value:"Путешествие"}, {label:t("form.property_title"), value:"Имущество"}];

  const features = [t("home.info1"), t("home.info2"), t("home.info3")];
  // const { data, isLoading } = useCategory();
  // const { data: dataSub, isLoading: isSubLoading } = useSubCategory(activeTab);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      activeTab,
      isSpecialVehicle,
      plateNumber,
      passportSeries,
      passportNumber,
      driversCount,
      vehicleType,
    });
  };
  // console.log(data, "data")
  useEffect(() => {
    setActiveSub(""); // reset when category changes
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background mt-10">
      {/* <Navbar /> */}
      <Header />

      {/* Hero */}
      <section className="container mx-auto  px-4 pt-12 pb-8 md:px-32">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
              {t("home.title1")}
              <span className="text-primary">{t("home.set1")}</span>
              <br />
              <span>{t("home.set2")}</span>
            </h1>
            <div className="flex flex-wrap gap-4 mb-10">
              {features.map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-[-120px] md:mt-0">
            <img src={heroImage} alt="Страхование" width={800} height={600} className="max-w-md w-full" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto  pb-16 md:px-28">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Left: Tabs + Form */}
          <div>
            <div className="flex rounded-t-xl overflow-hidden border border-b-0 border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/60 hover:bg-accent"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="glass-card bg-white rounded-b-xl rounded-t-none p-6 md:pt-0">
              <InsuranceForm activeTab={activeTab} />
            </div>
          </div>

          {/* Right: Companies */}
          <CompanyList />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

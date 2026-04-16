import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/assets/01.webp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Car, Plane, CheckCircle2 } from "lucide-react";
import { useCategory, useSubCategory } from "@/store/useCategory";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-illustration.png";
import Navbar from "./Navbar";
import InsuranceForm from "./InsuranceForm";
import CompanyList from "./CompanyList";
import Header from "./Header";
const tabs = ["ОСАГО", "КАСКО", "Путешествие", "Имущество"];
const features = ["Сравнимые цены", "Быстрое оформление", "Электронный полис"];

// const tabs = [
//   // { id: "all", label: "Все", icon: Layers, count: 6 },
//   { id: "osago", label: "ОСАГО", icon: Car, count: 1 },
//   { id: "kasko", label: "КАСКО", icon: Car, count: 3 },
//   // { id: "dms", label: "ДМС", icon: Heart, count: 1 },
//   { id: "travel", label: "Путешествия", icon: Plane, count: 1 },
//   // { id: "property", label: "Имущество", icon: Home, count: 0 },
// ];
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

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("ОСАГО");
  // const [activeTab, setActiveTab] = useState("796dc36b-5ea5-4c43-9333-149cbf9a0bc4");
  const [activeSub, setActiveSub] = useState("ed966f96-cc14-4a88-80b9-010db3f32d38");

  const [isSpecialVehicle, setIsSpecialVehicle] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [driversCount, setDriversCount] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { t } = useTranslation()
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
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Header />

      {/* Hero */}
      <section className="container mx-auto  px-4 pt-12 pb-8 md:px-10">
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
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Left: Tabs + Form */}
          <div>
            <div className="flex rounded-t-xl overflow-hidden border border-b-0 border-border">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/60 hover:bg-accent"
                    }`}
                >
                  {tab}
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/assets/01.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Car, Plane } from "lucide-react";
import { useCategory } from "@/store/useCategory";
import { useTranslation } from "react-i18next";

const tabs = [
  // { id: "all", label: "Все", icon: Layers, count: 6 },
  { id: "osago", label: "ОСАГО", icon: Car, count: 1 },
  { id: "kasko", label: "КАСКО", icon: Car, count: 3 },
  // { id: "dms", label: "ДМС", icon: Heart, count: 1 },
  { id: "travel", label: "Путешествия", icon: Plane, count: 1 },
  // { id: "property", label: "Имущество", icon: Home, count: 0 },
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("osago");
  const [isSpecialVehicle, setIsSpecialVehicle] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [driversCount, setDriversCount] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { t } = useTranslation()
  const { data, isLoading } = useCategory();

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

  return (
    <section className="relative min-h-screen flex items-center  pt-16 pb-16 overflow-hidden">
      <div className="absolute inset-0 home-hero opacity-95" />
      <img src={img} alt="" className=" absolute" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mt-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight animate-fade-in " style={{ animationDelay: "0.1s" }}>
              {t("home.title1")}
              <br />
            </h1>
            <p className="text-2xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto animate-fade-in text-[#1a66ff] text-bold" style={{ animationDelay: "0.2s" }}>
              {t("home.title2")}
            </p>
          </div>
          <div className="bg-card rounded-3xl shadow-hero p-6 lg:p-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
             {t("home.calc")}
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-4 px-3 py-3 rounded-full font-medium text-lg transition-all duration-300 ${activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary border border-border text-foreground hover:border-primary/50"
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span
                    className={`min-w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold ${activeTab === tab.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                      }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-8">
                <div className="space-y-2">
                  <Label
                    htmlFor="plateNumber"
                    className="text-sm font-semibold text-foreground"
                  >
                  {t("home.state_number")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="plateNumber"
                    placeholder="А001АА77"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                    className="h-14 bg-background"
                    required
                    maxLength={9}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    {t("home.serya")}
                     {/* <span className="text-destructive">*</span> */}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="ААA"
                      value={passportSeries}
                      onChange={(e) =>
                        setPassportSeries(e.target.value.toUpperCase().slice(0, 2))
                      }
                      className="h-14 w-20 bg-background text-center"
                      required
                      maxLength={2}
                    />
                    <Input
                      placeholder="0000000"
                      value={passportNumber}
                      onChange={(e) =>
                        setPassportNumber(e.target.value.replace(/\D/g, "").slice(0, 7))
                      }
                      className="h-14 flex-1 bg-background"
                      required
                      maxLength={7}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                   { t("home.drives")}
                  </Label>
                  <Select value={driversCount} onValueChange={setDriversCount}>
                    <SelectTrigger className="h-14 bg-background">
                      <SelectValue placeholder={t("home.not_limit")} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-xl shadow-lg z-50">
                      <SelectItem value="unlimited">{t("home.not_limit")}</SelectItem>
                      <SelectItem value="1">1 </SelectItem>
                      <SelectItem value="2">2 </SelectItem>
                      <SelectItem value="3">3 </SelectItem>
                      <SelectItem value="4">4 </SelectItem>
                      <SelectItem value="5">5 </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Тип автомобиля
                  </Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger className="h-14 bg-background">
                      <SelectValue placeholder="Легковой автомобиль" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-xl shadow-lg z-50">
                      <SelectItem value="car">Легковой автомобиль</SelectItem>
                      <SelectItem value="truck">Грузовой автомобиль</SelectItem>
                      <SelectItem value="bus">Автобус</SelectItem>
                      <SelectItem value="motorcycle">Мотоцикл</SelectItem>
                      <SelectItem value="tractor">Трактор</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="px-12">
                  {t("home.submit")}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

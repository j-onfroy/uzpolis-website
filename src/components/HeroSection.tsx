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
import { ChevronRight, Car, Plane } from "lucide-react";
import { useCategory, useSubCategory } from "@/store/useCategory";
import { useTranslation } from "react-i18next";

const tabs = [
  // { id: "all", label: "Все", icon: Layers, count: 6 },
  { id: "osago", label: "ОСАГО", icon: Car, count: 1 },
  { id: "kasko", label: "КАСКО", icon: Car, count: 3 },
  // { id: "dms", label: "ДМС", icon: Heart, count: 1 },
  { id: "travel", label: "Путешествия", icon: Plane, count: 1 },
  // { id: "property", label: "Имущество", icon: Home, count: 0 },
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

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("796dc36b-5ea5-4c43-9333-149cbf9a0bc4");
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
  // useEffect(() => {
  //   if (dataSub && dataSub.length > 0) {
  //     setActiveSub(dataSub[0].id);
  //   }
  // }, [dataSub]);
  return (
    <section className="relative min-h-screen flex items-center pt-10 lg:pt-16 pb-10 lg:pb-16 overflow-hidden">

      <div className="hidden lg:block absolute inset-0 home-hero opacity-95" />
      <img src={img} alt="" className=" lg:block absolute inset-0 w-full h-full object-cover" />

      <div className="hidden lg:block absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />

      <div className="hidden lg:block absolute top-1/2 right-1/3 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="hidden lg:block absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">

        <div className="max-w-5xl mx-auto">

          <div className="  mt-[-10px]  lg:text-white lg:block text-center lg:mt-6">
            <h1 className="text-4xl  lg:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight">
              {t("home.title1")}
            </h1>

            <p className="text-2xl hidden lg:flex lg:text-[#f9f9fa] font-bold mb-6 max-w-2xl mx-auto">
              {t("home.title2")}
            </p>
          </div>
{/* dasdfa */}
          <div className="bg-card rounded-3xl shadow-hero p-4 sm:p-6 lg:p-8">

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center mb-6">
              {t("home.calc")}
            </h2>

            {/* Tabs */}
            <div className="relative group">
              {/* LEFT SHADOW */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background to-transparent opacity-0 transition-opacity z-10" />

              {/* RIGHT SHADOW */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

              {/* SCROLL CONTAINER */}
              {/* <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-6 lg:mb-8 custom-scroll px-2">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  data?.map((tab: any, index: number) => (
                    <button
                      key={index + 1}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex shrink-0 items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all
          ${activeTab === tab.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-secondary border border-border text-foreground hover:border-primary/50"
                        }`}
                    >
                      <span className=" sm:inline">{tab.name}</span>

                      <span
                        className={`min-w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold
            ${activeTab === tab.id
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-primary/10 text-primary"
                          }`}
                      >
                        {tab.productCount}
                      </span>
                    </button>
                  ))
                )}
              </div> */}
            </div>
            {/* second */}
            {/* <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-6 lg:mb-8 custom-scroll px-2">
              {isSubLoading ? (
                <p>Loading...</p>
              ) : dataSub?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No subcategories</p>
              ) : (
                dataSub?.map((tab: any, index: number) => (
                  <button
                    key={index + 1}
                    onClick={() => setActiveSub(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all
        ${activeSub === tab.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary border border-border text-foreground hover:border-primary/50"
                      }`}
                  >
                    <span className=" sm:inline">{tab.name}</span>

                    <span
                      className={`min-w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold
          ${activeSub === tab.id
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                        }`}
                    >
                      {tab.productCount}
                    </span>
                  </button>
                ))
              )}
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 lg:mb-8">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    {t("home.state_number")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="А001АА77"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                    className="h-12 sm:h-14"
                    maxLength={9}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    {t("home.serya")}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="AAF"
                      value={passportSeries}
                      onChange={(e) =>
                        setPassportSeries(e.target.value.toUpperCase().slice(0, 2))
                      }
                      className="h-12 sm:h-14 w-16 sm:w-20 text-center"
                      maxLength={2}
                      required
                    />

                    <Input
                      placeholder="0000000"
                      value={passportNumber}
                      onChange={(e) =>
                        setPassportNumber(e.target.value.replace(/\D/g, "").slice(0, 7))
                      }
                      className="h-12 sm:h-14 flex-1"
                      maxLength={7}
                      required
                    />
                  </div>
                </div>

                {/* Drivers */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    {t("home.drives")}
                  </Label>

                  <Select value={driversCount} onValueChange={setDriversCount}>
                    <SelectTrigger className="h-12 sm:h-14">
                      <SelectValue placeholder={t("home.not_limit")} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="unlimited">{t("home.not_limit")}</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

              {/* Button */}
              <div className="flex justify-center">
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8 sm:px-12">
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

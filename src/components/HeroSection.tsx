import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, ChevronRight, Layers, Car, Heart, Plane, Home } from "lucide-react";

const tabs = [
  // { id: "all", label: "Все", icon: Layers, count: 6 },
  { id: "osago", label: "ОСАГО", icon: Car, count: 1 },
  { id: "kasko", label: "КАСКО", icon: Car, count: 3 },
  { id: "dms", label: "ДМС", icon: Heart, count: 1 },
  // { id: "travel", label: "Путешествия", icon: Plane, count: 1 },
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
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary-foreground/30 rounded-full animate-float" />
      <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Content */}
          <div className="text-center mt-6">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20 mb-6 animate-fade-in">
              <Shield className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Надёжная страховая защита</span>
            </div> */}

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Sug‘urta — tez, oson va onlayn
              <br />
              {/* <span className="opacity-90">за 2 минуты</span> */}
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Bir nechta sug‘urta kompaniyalaridan eng yaxshi takliflarni onlayn solishtiring va darhol rasmiylashtiring.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-card rounded-3xl shadow-hero p-6 lg:p-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {/* Card Title */}
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
              Калькулятор страхования
            </h2>

            {/* Tabs */}
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

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Form Fields Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
                {/* License Plate */}
                <div className="space-y-2">
                  <Label
                    htmlFor="plateNumber"
                    className="text-sm font-semibold text-foreground"
                  >
                    Гос. номер <span className="text-destructive">*</span>
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

                {/* Tech Passport */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Серия и номер ПТС <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="АА"
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

                {/* Drivers Count */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Кол-во водителей
                  </Label>
                  <Select value={driversCount} onValueChange={setDriversCount}>
                    <SelectTrigger className="h-14 bg-background">
                      <SelectValue placeholder="Без ограничений" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-xl shadow-lg z-50">
                      <SelectItem value="unlimited">Без ограничений</SelectItem>
                      <SelectItem value="1">1 водитель</SelectItem>
                      <SelectItem value="2">2 водителя</SelectItem>
                      <SelectItem value="3">3 водителя</SelectItem>
                      <SelectItem value="4">4 водителя</SelectItem>
                      <SelectItem value="5">5 водителей</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vehicle Type */}
                <div className="space-y-2">
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
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" size="lg" className="px-12">
                  Рассчитать стоимость
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Trust badges */}
          <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-primary-foreground/60 mb-4">Нам доверяют более 500 000 клиентов</p>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 opacity-70">
              <div className="text-primary-foreground font-bold text-lg">Росгосстрах</div>
              <div className="text-primary-foreground font-bold text-lg">Ингосстрах</div>
              <div className="text-primary-foreground font-bold text-lg">РЕСО</div>
              <div className="text-primary-foreground font-bold text-lg">Альфа</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Star, Check, ChevronDown, Car } from "lucide-react";
import logoSqb from "../assets/sqb.png";
import { useNavigate } from "react-router-dom";
// ── Types ────────────────────────────────────────────────────────────────────

type BadgeType = "cheapest" | "recommended" | "bestseller" | null;

interface Company {
  id: number;
  name: string;
  logo?: string;
  initials: string;
  color: string;
  bg: string;
  badge: BadgeType;
  rating: number;
  reviews: number;
  features: string[];
  price: number;
  discount: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const COMPANIES: Company[] = [
  {
    id: 1,
    name: "SQB Insurance",
    initials: "SQB",
    logo: logoSqb,
    color: "#1f4fd9",
    bg: "#e8eeff",
    badge: "cheapest",
    rating: 4.8,
    reviews: 2341,
    features: ["100 000 000 so'mgacha qoplama", "Uchinchi shaxs zarari", "Hayot va sog'liq"],
    price: 227000,
    discount: 100,
  },
  // {
  //   id: 2,
  //   name: "Inson Insurance",
  //   initials: "II",
  //   color: "#0d9488",
  //   bg: "#ccfbf1",
  //   badge: "recommended",
  //   rating: 4.8,
  //   reviews: 2341,
  //   features: ["100 000 000 so'mgacha qoplama", "Uchinchi shaxs zarari", "Hayot va sog'liq"],
  //   price: 245000,
  //   discount: 15,
  // },
  // {
  //   id: 3,
  //   name: "Kapital Sug'urta",
  //   initials: "KS",
  //   color: "#7c3aed",
  //   bg: "#ede9fe",
  //   badge: "bestseller",
  //   rating: 4.8,
  //   reviews: 2341,
  //   features: ["100 000 000 so'mgacha qoplama", "Uchinchi shaxs zarari", "24/7 yo'l yordami"],
  //   price: 263000,
  //   discount: 13,
  // },
  // {
  //   id: 4,
  //   name: "GROSS",
  //   initials: "GR",
  //   color: "#1565C0",
  //   bg: "#e3f0ff",
  //   badge: null,
  //   rating: 4.6,
  //   reviews: 1890,
  //   features: ["100 000 000 so'mgacha qoplama", "Uchinchi shaxs zarari", "Toʻlov kafолаti"],
  //   price: 278000,
  //   discount: 10,
  // },
  // {
  //   id: 5,
  //   name: "Kafolat",
  //   initials: "KF",
  //   color: "#0369A1",
  //   bg: "#e0f2fe",
  //   badge: null,
  //   rating: 4.5,
  //   reviews: 1200,
  //   features: ["50 000 000 so'mgacha qoplama", "Uchinchi shaxs zarari", "Yo'l yordami"],
  //   price: 291000,
  //   discount: 8,
  // },
];

const BADGE_CONFIG: Record<
  Exclude<BadgeType, null>,
  { label: string; cls: string }
> = {
  cheapest: { label: "Barchasi", cls: "bg-blue-100 text-blue-700" },
  recommended: { label: "TAVSIYA ETILGAN", cls: "bg-teal-100 text-teal-700" },
  bestseller: { label: "ENG KO'P SOTILGAN", cls: "bg-purple-100 text-purple-700" },
};

const SORT_OPTIONS = [
  { id: "cheapest", label: "Barchasi" },
  { id: "recommended", label: "Tavsiya etilgan" },
  { id: "bestseller", label: "Eng ko'p sotilgan" },
  { id: "rating", label: "Yuqori reyting" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU");
}

const CIRCLE_R = 14;
const CIRCLE_C = 2 * Math.PI * CIRCLE_R; // ~87.96

function DiscountRing({ value }: { value: number }) {
  const dash = (value / 100) * CIRCLE_C;
  return (
    <div className="relative w-11 h-11 flex-shrink-0">
      <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={CIRCLE_R} fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
        <circle
          cx="18" cy="18" r={CIRCLE_R}
          fill="none"
          stroke="#1f4fd9"
          strokeWidth="2.5"
          strokeDasharray={`${dash} ${CIRCLE_C}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#1f4fd9]">
        {value}%
      </span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

const CompanyList = () => {
  const [sort, setSort] = useState("cheapest");
  const [range, setRange] = useState([50, 200]);
  const navigator = useNavigate();
  const [services, setServices] = useState<Record<string, boolean>>({
    roadHelp: true,
    accComm: false,
    evacuator: false,
  });
  const [expanded, setExpanded] = useState(false);

  const toggleService = (id: string) =>
    setServices((prev) => ({ ...prev, [id]: !prev[id] }));

  const visible = expanded ? COMPANIES : COMPANIES.slice(0, 3);
  const hidden = COMPANIES.length - 3;

  return (
    <div className="w-full">
      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
            MISOL UCHUN
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            OSAGO uchun real vaqtda taklif solishtirish
          </h2>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5 items-start">
        {/* ── Sidebar ── */}
        <div className="bg-[#f5f6fb] rounded-2xl p-5 space-y-5">
          {/* Sort */}
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-3">
              SARALASH
            </p>
            <div className="space-y-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSort(opt.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${sort === opt.id
                      ? "bg-white text-primary font-semibold shadow-sm"
                      : "text-foreground hover:bg-white/70"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Coverage range */}
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-3">
               SUMMASI
            </p>
            <SliderPrimitive.Root
              className="relative flex w-full touch-none select-none items-center"
              min={50}
              max={200}
              step={10}
              value={range}
              onValueChange={setRange}
            >
              <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
                <SliderPrimitive.Range className="absolute h-full bg-primary" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-white shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-white shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />
            </SliderPrimitive.Root>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{range[0]} mln</span>
              <span className="text-xs text-muted-foreground">{range[1]} mln</span>
            </div>
          </div>
        </div>

        {/* ── Company cards ── */}
        <div className="space-y-3">
          {visible.map((c, i) => {
            // const isFirst = i === 0;
            const isFirst = false; // Highlight the cheapest offer
            const badge = c.badge ? BADGE_CONFIG[c.badge] : null;

            return (
              <div
                key={c.id}
                onClick={() => navigator("/register")}
                className={`bg-white rounded-2xl border transition-all hover:border-primary hover:shadow-[0_0_0_1px_#1f4fd9] ${isFirst
                    ? "border-primary shadow-[0_0_0_1px_#1f4fd9]"
                    : "border-border hover:border-primary/40 hover:shadow-sm"
                  }`}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Logo */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: c.bg, color: c.color }}
                  >
                    {c.logo ? <img src={c.logo} alt={c.name} className="w-8 " /> : c.initials}
                  </div>

                  {/* Name + badge + rating */}
                  <div className="min-w-[130px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">{c.name}</span>
                      
                    </div>
                    {/* <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-muted-foreground">
                        {c.rating} · {c.reviews.toLocaleString("ru-RU")} sharh
                      </span>
                    </div> */}
                  </div>

                  {/* Features */}
                  {/* <div className="hidden md:flex flex-col gap-1 flex-1">
                    {c.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2.5} />
                        <span className="text-xs text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div> */}

                  {/* Price + discount + button */}
                  <div className="flex items-center gap-3 ml-auto flex-shrink-0">
                    {/* <div className="text-right">
                      <p className="text-2xl font-extrabold text-foreground leading-none">
                        {formatPrice(c.price)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">so'm</p>
                    </div> */}

                    <DiscountRing value={c.discount} />

                    <button
                      onClick={() => navigator("/register")}
                      className={`hidden md:flex px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 whitespace-nowrap ${isFirst
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "border border-border text-foreground hover:border-primary hover:text-primary"
                        }`}
                    >
                      Tanlash
                    </button>
                  </div>
                </div>

                {/* Mobile features */}
                <div className="md:hidden flex flex-col gap-1 px-5 pb-4">
                  {c.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-xs text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Show more */}
          {!expanded && hidden > 0 && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Yana {hidden} ta taklif
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;

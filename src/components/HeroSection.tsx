import { useState } from "react";
import { Shield, Car, Plane, Home, Heart, ArrowRight, Loader2, AlertCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import bgImage from "@/assets/home/home.png";
import { osagoCalculate } from "@/service/apis/osago.api";
import { CustomSelect } from "@/components/ui/CustomSelect";

type FieldType = "text" | "plate" | "select" | "date" | "number";

// ── Formatters ──────────────────────────────────────────────────────────────

/** A 123 BC — 1 harf, 3 raqam, 2 harf  |  641 BNA — 3 raqam, 3 harf */
function formatPlate(input: string): string {
  const raw = input.replace(/\s/g, "").toUpperCase();
  if (!raw) return "";
  if (/^\d/.test(raw)) {
    // Format: 3 digits + 3 letters (e.g., 641 BNA)
    const chars: string[] = [];
    let dc = 0, lc = 0;
    for (const ch of raw) {
      if (dc < 3 && /\d/.test(ch)) { chars.push(ch); dc++; }
      else if (dc === 3 && lc < 3 && /[A-Z]/.test(ch)) { chars.push(ch); lc++; }
      if (lc >= 3) break;
    }
    if (!chars.length) return "";
    let out = chars.slice(0, 3).join("");
    if (chars.length > 3) out += " " + chars.slice(3).join("");
    return out;
  }
  // Format: 1 letter + 3 digits + 2 letters (e.g., A 123 BC)
  const chars: string[] = [];
  let pos = 0;
  for (const ch of raw) {
    if (pos === 0 && /[A-Z]/.test(ch)) { chars.push(ch); pos++; }
    else if (pos >= 1 && pos <= 3 && /\d/.test(ch)) { chars.push(ch); pos++; }
    else if (pos >= 4 && pos <= 5 && /[A-Z]/.test(ch)) { chars.push(ch); pos++; }
    if (pos > 5) break;
  }
  if (!chars.length) return "";
  let out = chars[0];
  if (chars.length >= 2) out += " " + chars.slice(1, Math.min(4, chars.length)).join("");
  if (chars.length >= 5) out += " " + chars.slice(4).join("");
  return out;
}

/** AA1234567 — 2 harf + 7 raqam, katta harf */
function formatPassport(input: string): string {
  const raw = input.replace(/\s/g, "").toUpperCase();
  const chars: string[] = [];
  let pos = 0;
  for (const ch of raw) {
    if (pos < 2 && /[A-Z]/.test(ch)) { chars.push(ch); pos++; }
    else if (pos >= 2 && pos < 9 && /\d/.test(ch)) { chars.push(ch); pos++; }
    if (pos >= 9) break;
  }
  return chars.join("");
}

/** AAA — faqat harflar, katta harf, max 3 */
const formatSeries = (input: string) =>
  input.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 3);

/** 0000000 — faqat raqamlar, max 7 */
const formatTechNum = (input: string) =>
  input.replace(/\D/g, "").slice(0, 7);

/** Raqam maydoni — faqat raqamlar */
const formatDigits = (input: string) => input.replace(/\D/g, "");

const FORMATTERS: Record<string, (v: string) => string> = {
  plate: formatPlate,
  techSeries: formatSeries,
  techNumber: formatTechNum,
  passport: formatPassport,
  area: formatDigits,
  propValue: formatDigits,
};

interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  regex?: RegExp;
  errorMsg?: string;
  options?: { value: string; label: string }[];
  inputMode?: "text" | "numeric" | "decimal";
}

const TABS = [
  { id: "OSAGO", icon: Car, label: "OSAGO", sub: "Majburiy sug'urta" },
  { id: "KASKO", icon: Shield, label: "KASKO", sub: "Avtotransport sug'urtasi" },
  { id: "Travel", icon: Plane, label: "Sayohat", sub: "Chet el sug'urtasi" },
  { id: "Home", icon: Home, label: "Uy-joy", sub: "Ko'chmas mulk" },
  { id: "Life", icon: Heart, label: "Hayot", sub: "Sog'liq va hayot" },
];

const YEARS = Array.from({ length: 35 }, (_, i) => {
  const y = new Date().getFullYear() - i;
  return { value: String(y), label: String(y) };
});

const FIELDS: Record<string, FieldDef[]> = {
  OSAGO: [
    {
      id: "plate",
      label: "Davlat raqami",
      type: "plate",
      placeholder: "A 123 BC ",
      regex: /^([A-Za-z]\s?\d{3}\s?[A-Za-z]{2}|\d{3}\s?[A-Za-z]{3})$/,
      errorMsg: "Format: A 123 BC yoki 641 BNA",
    },
    {
      id: "techSeries",
      label: "Texnik pasport seriyasi",
      type: "text",
      placeholder: "AAA",
      regex: /^[A-Za-z]{2,3}$/,
      errorMsg: "2–3 ta harf (masalan: AAA)",
    },
    {
      id: "techNumber",
      label: "Texnik pasport raqami",
      type: "text",
      placeholder: "0000000",
      regex: /^\d{7}$/,
      errorMsg: "Aniq 7 ta raqam",
      inputMode: "numeric",
    },
    {
      id: "drivers",
      label: "Haydovchilar soni",
      type: "select",
      placeholder: "Tanlang",
      options: [
        { value: "unlimited", label: "Cheklanmagan" },
        { value: "limited", label: "Cheklangan (5 kishigacha haydovchi )" },
      ],
    },
    {
      id: "period",
      label: "Muddati",
      type: "select",
      placeholder: "Tanlang",
      options: [
        { value: "2", label: "6 oy" },
        { value: "1", label: "12 oy" },
      ],
    },
  ],
  KASKO: [
    {
      id: "plate",
      label: "Davlat raqami",
      type: "plate",
      placeholder: "A 123 BC",
      regex: /^[A-Za-z]\s?\d{3}\s?[A-Za-z]{2}$/,
      errorMsg: "Format: A 123 BC",
    },
    {
      id: "techSeries",
      label: "Texnik pasport seriyasi",
      type: "text",
      placeholder: "AAA",
      regex: /^[A-Za-z]{2,3}$/,
      errorMsg: "2–3 ta harf",
    },
    {
      id: "techNumber",
      label: "Texnik pasport raqami",
      type: "text",
      placeholder: "0000000",
      regex: /^\d{7}$/,
      errorMsg: "Aniq 7 ta raqam",
      inputMode: "numeric",
    },
    {
      id: "carYear",
      label: "Avtomobil yili",
      type: "select",
      placeholder: "Yil tanlang",
      options: YEARS,
    },
  ],
  Travel: [
    {
      id: "passport",
      label: "Pasport seriyasi va raqami",
      type: "text",
      placeholder: "AA1234567",
      regex: /^[A-Za-z]{2}\d{7}$/,
      errorMsg: "2 harf + 7 raqam (masalan: AA1234567)",
    },
    {
      id: "destination",
      label: "Yo'nalish",
      type: "select",
      placeholder: "Davlat tanlang",
      options: [
        { value: "world", label: "Butun dunyo" },
        { value: "schengen", label: "Shengen zonasi" },
        { value: "turkey", label: "Turkiya" },
        { value: "uae", label: "BAA (Dubai)" },
        { value: "russia", label: "Rossiya" },
        { value: "china", label: "Xitoy" },
      ],
    },
    {
      id: "departure",
      label: "Ketish sanasi",
      type: "date",
      placeholder: "",
    },
    {
      id: "returnDate",
      label: "Qaytish sanasi",
      type: "date",
      placeholder: "",
    },
  ],
  Home: [
    {
      id: "address",
      label: "Manzil",
      type: "text",
      placeholder: "Toshkent, Chilonzor, 12-uy",
      regex: /^.{5,}$/,
      errorMsg: "Kamida 5 ta belgi kiriting",
    },
    {
      id: "propType",
      label: "Mulk turi",
      type: "select",
      placeholder: "Tanlang",
      options: [
        { value: "apartment", label: "Kvartira" },
        { value: "house", label: "Xususiy uy" },
        { value: "office", label: "Ofis" },
        { value: "land", label: "Yer uchastkasi" },
      ],
    },
    {
      id: "area",
      label: "Maydon (m²)",
      type: "number",
      placeholder: "60",
      regex: /^\d{1,4}$/,
      errorMsg: "To'g'ri maydon kiriting",
      inputMode: "numeric",
    },
    {
      id: "propValue",
      label: "Taxminiy qiymat (so'm)",
      type: "number",
      placeholder: "150 000 000",
      regex: /^\d+$/,
      errorMsg: "Faqat raqam kiriting",
      inputMode: "numeric",
    },
  ],
  Life: [
    {
      id: "fullName",
      label: "F.I.Sh",
      type: "text",
      placeholder: "Familiya Ism Otasining ismi",
      regex: /^[\p{L}\s]{5,}$/u,
      errorMsg: "To'liq ism kiriting (kamida 5 belgi)",
    },
    {
      id: "birthDate",
      label: "Tug'ilgan sana",
      type: "date",
      placeholder: "",
    },
    {
      id: "passport",
      label: "Pasport seriyasi va raqami",
      type: "text",
      placeholder: "AA1234567",
      regex: /^[A-Za-z]{2}\d{7}$/,
      errorMsg: "2 harf + 7 raqam (masalan: AA1234567)",
    },
    {
      id: "coverage",
      label: "Sug'urta summasi",
      type: "select",
      placeholder: "Tanlang",
      options: [
        { value: "5m", label: "5 000 000 so'm" },
        { value: "10m", label: "10 000 000 so'm" },
        { value: "20m", label: "20 000 000 so'm" },
        { value: "50m", label: "50 000 000 so'm" },
      ],
    },
  ],
};

const inputBase =
  "w-full px-3 py-3 text-base rounded-xl border outline-none transition-colors bg-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("OSAGO");
  const [allValues, setAllValues] = useState<Record<string, Record<string, string>>>(() => {
    try { return JSON.parse(localStorage.getItem("hero_form_values") ?? "{}"); } catch { return {}; }
  });
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [region, setRegion]   = useState(() => localStorage.getItem("hero_form_region") ?? "01");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const values = allValues[activeTab] ?? {};
  const fields = FIELDS[activeTab] ?? [];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setErrors({});
    setApiError(null);
  };

  const validate = (field: FieldDef, val: string): string => {
    if (!val.trim()) return "Maydonni to'ldiring";
    if (field.regex && !field.regex.test(val.trim())) return field.errorMsg ?? "Noto'g'ri format";
    return "";
  };

  const handleBlur = (field: FieldDef) => {
    const err = validate(field, values[field.id] ?? "");
    setErrors((prev) => ({ ...prev, [field.id]: err }));
  };

  const handleChange = (id: string, raw: string) => {
    const formatted = FORMATTERS[id] ? FORMATTERS[id](raw) : raw;
    setAllValues((prev) => {
      const next = { ...prev, [activeTab]: { ...(prev[activeTab] ?? {}), [id]: formatted } };
      localStorage.setItem("hero_form_values", JSON.stringify(next));
      return next;
    });
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleRegionChange = (val: string) => {
    const v = val.replace(/\D/g, "").slice(0, 2);
    setRegion(v);
    localStorage.setItem("hero_form_region", v);
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const err = validate(f, values[f.id] ?? "");
      if (err) newErrors[f.id] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (activeTab === "OSAGO") {
      setLoading(true);
      setApiError(null);
      try {
        const plateRaw = (values["plate"] ?? "").replace(/\s/g, "");
        const limited  = values["drivers"] !== "unlimited";
        const result   = await osagoCalculate({
          limited,
          drivers: [],
          gosNumber: `${region}${plateRaw}`,
          techSery:  values["techSeries"] ?? "",
          techNumber: values["techNumber"] ?? "",
          periodId:  Number(values["period"] ?? "1"),
        });
        navigate("/register", {
          state: {
            calcResult: result,
            formData: {
              gosNumber:  values["plate"] ?? "",
              techSery:   values["techSeries"] ?? "",
              techNumber: values["techNumber"] ?? "",
              periodId:   Number(values["period"] ?? "1"),
              limited,
              region,
            },
          },
        });
      } catch (err: any) {
        setApiError(err?.response?.data?.error ?? "Xatolik yuz berdi. Qayta urinib ko'ring.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <section
        className="relative min-h-[95vh] flex flex-col overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, #eaf0fb 0%, #eef3ff 35%, rgba(235,242,255,0.82) 55%, rgba(235,242,255,0.25) 75%, transparent 90%), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundColor: "#eaf0fb",
        }}
      >
        <div className="relative z-10 container mx-auto px-4 mt-10 md:px-20 md:pt-16 pb-8 flex flex-col flex-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0d1b4b] leading-tight mb-5 max-w-2xl">
            Sug'urtani <span className="text-[#1f4fd9]">oson, tez</span>
            <br />
            va <span className="text-[#1f4fd9]">ishonchli</span>
            <br />
            rasmiylashtiring
          </h1>

          <p className="text-slate-600 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            Bir nechta rasmiy sug'urtachilarning takliflarini bitta joyda solishtiring, eng yaxshi narxni tanlang va polisni 2 daqiqada onlayn xarid qiling.
          </p>

          {/* ── Form card ── */}
          <div className="bg-white rounded-2xl shadow-2xl pb-1">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/60">
              <span className="text-sm font-semibold text-foreground">Sug'urta turini tanlang</span>
              <span className="text-xs text-muted-foreground hidden md:block">
                Yordam kerakmi?{" "}
                <span className="text-primary font-medium cursor-pointer hover:underline">
                  Maslahatchi bilan bog'lanish
                </span>
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 overflow-x-auto border-b border-border/60">
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 min-w-[130px] flex items-center gap-2.5 px-4 py-3.5 transition-all border-b-2 ${
                      active
                        ? "border-primary text-primary bg-primary/4"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? "bg-primary/10" : "bg-muted"}`}>
                      <tab.icon className={`${active ? "text-primary" : "text-muted-foreground"}`} style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-semibold leading-tight ${active ? "text-primary" : ""}`}>{tab.label}</div>
                      <div className="text-[10px] opacity-55 leading-tight mt-0.5">{tab.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fields */}
            <div className="  px-5 mt-4 mb-5 space-y-3">
              <div className="flex  flex-col md:flex-row md:items-center gap-3 flex-wrap">
                {fields.map((field) => (
                  <div key={field.id} className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">{field.label}</label>

                    {field.type === "plate" && (
                      <div className={`flex items-stretch border rounded-xl overflow-hidden transition-colors ${
                        errors[field.id]
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
                      }`}>
                        <div className="flex flex-col items-center justify-center px-2.5 bg-muted border-r border-border min-w-[44px] gap-0.5">
                          <input
                            className="w-8 text-sm font-bold text-center bg-transparent outline-none leading-none"
                            value={region}
                            maxLength={2}
                            onChange={(e) => handleRegionChange(e.target.value)}
                          />
                          <span className="text-[9px] text-muted-foreground leading-none">UZ</span>
                        </div>
                        <input
                          className="flex-1 px-3 py-3 text-base outline-none bg-transparent placeholder:text-muted-foreground"
                          placeholder={field.placeholder}
                          value={values[field.id] ?? ""}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          onBlur={() => handleBlur(field)}
                          maxLength={8}
                        />
                      </div>
                    )}

                    {field.type === "text" && (
                      <input
                        className={`${inputBase} ${errors[field.id] ? "border-red-400 ring-2 ring-red-100" : "border-border"}`}
                        placeholder={field.placeholder}
                        value={values[field.id] ?? ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        onBlur={() => handleBlur(field)}
                        inputMode={field.inputMode}
                      />
                    )}

                    {field.type === "number" && (
                      <input
                        type="text"
                        inputMode="numeric"
                        className={`${inputBase} ${errors[field.id] ? "border-red-400 ring-2 ring-red-100" : "border-border"}`}
                        placeholder={field.placeholder}
                        value={values[field.id] ?? ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        onBlur={() => handleBlur(field)}
                      />
                    )}

                    {field.type === "date" && (
                      <input
                        type="date"
                        className={`${inputBase} ${errors[field.id] ? "border-red-400 ring-2 ring-red-100" : "border-border"}`}
                        value={values[field.id] ?? ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        onBlur={() => handleBlur(field)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    )}

                    {field.type === "select" && (
                      <CustomSelect
                        value={values[field.id] ?? ""}
                        onChange={(val) => handleChange(field.id, val)}
                        onBlur={() => handleBlur(field)}
                        placeholder={field.placeholder}
                        options={field.options ?? []}
                        error={errors[field.id]}
                      />
                    )}

                    {errors[field.id] && (
                      <p className="text-[11px] text-red-500 mt-1">{errors[field.id]}</p>
                    )}
                  </div>
                ))}

                <div className="flex items-center pt-6 flex-shrink-0 ">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex  items-center gap-2 px-7 py-[11px] bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>{t("home.submit")} <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>

              {/* API error */}
              {apiError && !loading && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="flex-1 text-xs text-red-600">{apiError}</p>
                  <button onClick={() => setApiError(null)} className="text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

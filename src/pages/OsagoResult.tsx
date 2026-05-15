import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Car, ArrowLeft, ArrowRight, CheckCircle2, X, Loader2, AlertCircle,
  Calendar, Shield, User, FileText, Palette, Hash,
} from "lucide-react";
import { osagoCreateContract, type OsagoCalculateResponse, type OsagoContractResponse } from "@/service/apis/osago.api";

const PERIOD_LABELS: Record<number, string> = { 1: "3 oy", 2: "12 oy" };

const inp =
  "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none bg-white transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-400";

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <p className="text-[11px] text-gray-400 leading-none mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  </div>
);

const OsagoResult = () => {
  const { state } = useLocation() as { state: { result: OsagoCalculateResponse } | null };
  const navigate = useNavigate();

  const result = state?.result;

  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<"contract" | "done">("contract");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [form, setForm] = useState({
    phoneNumber: "",
    startDate: "",
    ownerSeriya: "",
    ownerNumber: "",
    passSeriya: "",
    passNumber: "",
    birthDate: "",
  });

  if (!result) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Ma'lumot topilmadi</p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
          >
            Bosh sahifaga
          </button>
        </div>
      </div>
    );
  }

  const setField = (key: keyof typeof form, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
  };

  const handleCreateContract = async () => {
    setModalLoading(true);
    setModalError(null);
    try {
      const contract: OsagoContractResponse = await osagoCreateContract({
        calculationId: result.id,
        startDate: form.startDate,
        phoneNumber: form.phoneNumber.replace(/\D/g, ''),
        owner: {
          person: {
            passSeriya: form.ownerSeriya,
            passNumber: form.ownerNumber,
          },
        },
        drivers: result.limited
          ? [{ passSeriya: form.passSeriya, passNumber: form.passNumber, birthDate: form.birthDate }]
          : [],
      });
      navigate("/osago/payment", { state: { contract } });
    } catch (err: any) {
      setModalError(err?.response?.data?.message ?? "Ariza yuborishda xatolik yuz berdi.");
    } finally {
      setModalLoading(false);
    }
  };

  const canSubmit =
    form.phoneNumber.replace(/\D/g, '').length === 12 &&
    form.startDate &&
    form.ownerSeriya.length >= 2 &&
    form.ownerNumber.length >= 7 &&
    (!result.limited || (form.passSeriya.length >= 2 && form.passNumber.length >= 7 && form.birthDate));

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])
  return (
    <div className="min-h-[110vh] bg-[#f5f7fb] pb-10">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Orqaga
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OSAGO hisob-kitobi</h1>
              <p className="text-xs text-gray-400 mt-0.5">Hisoblash muvaffaqiyatli yakunlandi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Price banner */}
        <div className="bg-blue-600 rounded-2xl px-6 py-5 flex items-center justify-between text-white">
          <div>
            <p className="text-sm text-blue-200 mb-1">To'lov miqdori</p>
            <p className="text-3xl font-extrabold">
              {Number(result.amountUzs).toLocaleString("uz-UZ")}
              <span className="text-base font-normal text-blue-200 ml-1">so'm</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-200 mb-1">Muddat</div>
            <div className="text-lg font-bold">{PERIOD_LABELS[result.periodId] ?? `${result.periodId}-davr`}</div>
            <div className="text-xs text-blue-200 mt-1">{result.limited ? "Cheklangan" : "Cheklanmagan"}</div>
          </div>
        </div>

        {/* Vehicle info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">01</div>
            <span className="text-sm font-semibold text-gray-900">Avtomobil ma'lumotlari</span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard icon={User} label="Egasi" value={result.owner} />
            <InfoCard icon={Car} label="Marka / Model" value={`${result.markaName} ${result.modelName}`} />
            <InfoCard icon={Palette} label="Rang" value={result.vehicleColor} />
            <InfoCard icon={Calendar} label="Ishlab chiqarilgan yil" value={String(result.issueYear)} />
            <InfoCard icon={Hash} label="Davlat raqami" value={result.gosNumber} />
            <InfoCard icon={FileText} label="Texnik pasport" value={`${result.techSery} ${result.techNumber}`} />
            <InfoCard icon={Car} label="Transport turi" value={result.vehicleType} />
            <InfoCard icon={Shield} label="Shaxs turi" value={result.juridic ? "Yuridik shaxs" : "Jismoniy shaxs"} />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => { setShowModal(true); setModalStep("contract"); setModalError(null); }}
          className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-base hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-200"
        >
          Ariza berish
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Contract modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[95vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {modalStep === "contract" ? "Ariza ma'lumotlari" : "Ariza qabul qilindi"}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all ${(modalStep === "contract" ? 0 : 1) >= i ? "bg-blue-600 w-8" : "bg-gray-200 w-4"
                        }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-5 py-5 space-y-3 overflow-y-auto">
              {modalStep === "contract" && (
                <>
                  {/* Contact */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Telefon raqami</label>
                    <input
                      className={inp}
                      placeholder="+998 90 000 00 00"
                      inputMode="numeric"
                      value={form.phoneNumber}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, '').slice(0, 12);
                        let out = d.length ? '+' + d.slice(0, 3) : '';
                        if (d.length > 3) out += ' ' + d.slice(3, 5);
                        if (d.length > 5) out += ' ' + d.slice(5, 8);
                        if (d.length > 8) out += ' ' + d.slice(8, 10);
                        if (d.length > 10) out += ' ' + d.slice(10, 12);
                        setField("phoneNumber", out);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Boshlanish sanasi</label>
                    <input
                      type="date"
                      className={inp}
                      value={form.startDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setField("startDate", e.target.value)}
                    />
                  </div>

                  {/* Owner passport */}
                  <p className="text-xs font-semibold text-gray-500 pt-1">Egasi pasporti</p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Seriya</label>
                      <input
                        className={inp}
                        placeholder="AB"
                        maxLength={2}
                        value={form.ownerSeriya}
                        onChange={(e) =>
                          setField("ownerSeriya", e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 2))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Raqam</label>
                      <input
                        className={inp}
                        placeholder="0000000"
                        maxLength={7}
                        inputMode="numeric"
                        value={form.ownerNumber}
                        onChange={(e) =>
                          setField("ownerNumber", e.target.value.replace(/\D/g, "").slice(0, 7))
                        }
                      />
                    </div>
                  </div>

                  {/* Driver passport — only when limited */}
                  {result.limited && (
                    <>
                      <p className="text-xs font-semibold text-gray-500 pt-1">Haydovchi ma'lumotlari</p>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Seriya</label>
                          <input
                            className={inp}
                            placeholder="AB"
                            maxLength={2}
                            value={form.passSeriya}
                            onChange={(e) =>
                              setField("passSeriya", e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 2))
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Raqam</label>
                          <input
                            className={inp}
                            placeholder="0000000"
                            maxLength={7}
                            inputMode="numeric"
                            value={form.passNumber}
                            onChange={(e) =>
                              setField("passNumber", e.target.value.replace(/\D/g, "").slice(0, 7))
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Tug'ilgan sana</label>
                        <input
                          type="date"
                          className={inp}
                          value={form.birthDate}
                          onChange={(e) => setField("birthDate", e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {modalError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-600">{modalError}</p>
                    </div>
                  )}

                  <button
                    onClick={handleCreateContract}
                    disabled={modalLoading || !canSubmit}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {modalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>Ariza yuborish <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </>
              )}

              {modalStep === "done" && (
                <div className="flex flex-col items-center py-6 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-green-500" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">Ariza muvaffaqiyatli yuborildi!</p>
                    <p className="text-sm text-gray-400 mt-1">Tez orada siz bilan bog'lanamiz.</p>
                  </div>
                  <button
                    onClick={() => navigate("/")}
                    className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all"
                  >
                    Bosh sahifaga
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OsagoResult;

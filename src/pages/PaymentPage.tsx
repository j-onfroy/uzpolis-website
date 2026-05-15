import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2, ArrowLeft, ExternalLink, Calendar, Hash, Phone,
  Clock, CreditCard, Wallet, Shield, Building2, Info, Copy,
  Check, Home, Receipt, Smartphone, Landmark
} from "lucide-react";
import click from "@/assets/click.jpg";
import payme from "@/assets/payme.png";
// Add FileText icon if not already imported
import { FileText } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import type { OsagoContractResponse, OsagoConfirmResponse } from "@/service/apis/osago.api";
import { osagoConfirmPayment } from "@/service/apis/osago.api";
import { AlertCircle, Loader2, X } from "lucide-react";
import sqbLogo from "@/assets/sqb.png";

const PERIOD_LABELS: Record<number, string> = { 1: "3 oy", 2: "12 oy" };

const PaymentPage = () => {
  const { state } = useLocation() as { state: { contract: OsagoContractResponse } | null };
  const navigate = useNavigate();
  const [copied, setCopied]               = useState(false);
  const [confirmOpen, setConfirmOpen]     = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmResult, setConfirmResult] = useState<OsagoConfirmResponse | null>(null);
  const [confirmError, setConfirmError]   = useState<string | null>(null);
  const paymentClicked = useRef(false);

  const contract = state?.contract;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!contract) return;
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && paymentClicked.current) {
        paymentClicked.current = false;
        setConfirmOpen(true);
        setConfirmResult(null);
        setConfirmError(null);
        setConfirmLoading(true);
        osagoConfirmPayment(contract.sqbContractId)
          .then((res) => setConfirmResult(res))
          .catch((err) =>
            setConfirmError(err?.response?.data?.message ?? "To'lov tasdiqlanmadi. Qayta urinib ko'ring.")
          )
          .finally(() => setConfirmLoading(false));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [contract]);

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Receipt className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-gray-700 font-medium">Ma'lumot topilmadi</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">To'lov ma'lumotlari mavjud emas</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const copyContractId = () => {
    navigator.clipboard.writeText(contract.sqbContractId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: string) => {
    const [y, m, d] = date.split("-");
    return `${d}-${m}-${y}`;
  };

  const calculateEndDate = (startDate: string, periodId: number) => {
    const [y, m, d] = startDate.split("-").map(Number);
    const end = new Date(y, m - 1 + ({ 1: 3, 2: 12 }[periodId] ?? 12), d);
    const ey = end.getFullYear();
    const em = String(end.getMonth() + 1).padStart(2, "0");
    const ed = String(end.getDate()).padStart(2, "0");
    return `${ed}-${em}-${ey}`;
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    const p = digits.startsWith("998") ? digits : `998${digits}`;
    return `+${p.slice(0, 3)} ${p.slice(3, 5)} ${p.slice(5, 8)} ${p.slice(8, 10)} ${p.slice(10, 12)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-12">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-blue-100 hover:text-white transition mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
            Orqaga
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">To'lovni amalga oshiring</h1>
              <p className="text-blue-100 text-sm mt-0.5">Qulay to'lov usulini tanlang</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Success badge with animation */}
        {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-5 py-4 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-800">Ariza muvaffaqiyatli yaratildi</p>
            </div>
            <p className="text-xs text-green-600 mt-0.5">Shartnoma raqami: #{contract.sqbContractId}</p>

            <button
              onClick={copyContractId}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-green-200 flex items-center justify-center hover:bg-green-50 transition group"
              title="Shartnoma raqamini nusxalash"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-green-600 group-hover:scale-105 transition" />
              )}
            </button>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Contract details card — chap */}
          <div className="w-full md:flex-1 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 " />
                </div>
                <p className="text-sm font-bold text-gray-800">Shartnoma tafsilotlari</p>
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Contract ID with copy */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2 ">
                  <Hash className="w-4 h-4" />
                  <span className="text-xs font-medium">Shartnoma ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-semibold text-gray-800">{contract.sqbContractId}</span>
                  <button
                    onClick={copyContractId}
                    className="opacity-1 group-hover:opacity-100 transition p-1 hover:bg-gray-100 rounded"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Boshlanish sanasi</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-800">{formatDate(contract.startDate)}</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">{contract.startDate}</p>
                </div>
              </div>

              {/* End Date (calculated) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">Tugash sanasi</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-800">
                    {calculateEndDate(contract.startDate, contract.periodId)}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {PERIOD_LABELS[contract.periodId]} muddat
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-medium">Telefon raqam</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{formatPhone(contract.phoneNumber)}</span>
              </div>

              {/* Status with badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">Holati</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                    {contract.status === "active" ? "Faol" : contract.status === "pending" ? "Kutilmoqda" : contract.status}
                  </span>
                </div>
              </div>

              {/* Amount due */}
              <div className="mt-4 pt-4 border-t-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Jami to'lov</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">QQS bilan birga</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-blue-600">
                      {Number(contract.amountUzs).toLocaleString("uz-UZ")}
                    </span>
                    <span className="text-sm font-medium text-gray-500 ml-1">so'm</span>
                  </div>
                </div>
              </div>

              {/* Additional info if available */}
              {(contract as any).paymentDeadline && (
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-800">To'lov muddati</p>
                      <p className="text-xs text-amber-700 mt-0.5">{(contract as any).paymentDeadline}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Payment methods — o'ng */}
          <div className="w-full md:w-96 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg  flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5 " />
                </div>
                <p className="text-sm font-bold text-gray-800">To'lov usulini tanlang</p>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Tugmani bosing — to'lov sahifasiga o'tasiz</p>
            </div>
            <div className="p-4 space-y-3">
              {/* Payme */}
              <a
                href={contract.paymeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { paymentClicked.current = true; }}
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img src={payme} alt="Payme" className="w-20 border rounded-sm object-contain flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Payme orqali to'lash</p>
                    <p className="text-xs text-gray-400 mt-0.5">Karta, Payme hamyon</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700 font-semibold text-sm flex-shrink-0">
                  {Number(contract.amountUzs).toLocaleString("uz-UZ")} so'm
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition" />
                </div>
              </a>

              {/* Click */}
              <a
                href={contract.clickUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { paymentClicked.current = true; }}
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img src={click} alt="Click" className="w-20 border rounded-sm object-contain flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Click orqali to'lash</p>
                    <p className="text-xs text-gray-400 mt-0.5">Karta, Click hamyon</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700 font-semibold text-sm flex-shrink-0">
                  {Number(contract.amountUzs).toLocaleString("uz-UZ")} so'm
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition" />
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          {/* <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Bosh sahifa
          </button> */}
          {/* <button
            onClick={() => window.print()}
            className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4" />
            Ma'lumotlarni chop etish
          </button> */}
        </div>

        {/* Security footer */}
        {/* <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Shield className="w-3 h-3" />
            <span>To'lovlar xavfsizligi kafolatlangan</span>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <span>SSL shifrlangan</span>
          </div>
        </div> */}
      </div>

      {/* ── Confirm payment modal ── */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

            {/* Loading */}
            {confirmLoading && (
              <>
                <div className="px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">To'lov holati</p>
                </div>
                <div className="px-5 py-6 flex flex-col items-center gap-3 text-center">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                  <p className="text-sm font-medium text-gray-700">To'lov tekshirilmoqda...</p>
                  <p className="text-xs text-gray-400">Iltimos kuting</p>
                </div>
              </>
            )}

            {/* Success — result=0 && statusPayment=2 */}
            {!confirmLoading && confirmResult?.result === 0 && confirmResult?.statusPayment === 2 && (
              <>
                <div className="px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">To'lov muvaffaqiyatli</p>
                </div>
                <div className="px-5 py-6 space-y-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-base font-bold text-gray-900">Polis faollashtirildi!</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 text-sm">
                    {confirmResult.policySery && confirmResult.policyNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Polis seriya/raqam</span>
                        <span className="font-semibold">{confirmResult.policySery} {confirmResult.policyNumber}</span>
                      </div>
                    )}
                    {confirmResult.policyId && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Polis ID</span>
                        <span className="font-semibold font-mono text-xs">{confirmResult.policyId}</span>
                      </div>
                    )}
                    {confirmResult.policyFileUrl && (
                      <a
                        href={confirmResult.policyFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-600 font-medium hover:underline pt-1"
                      >
                        <FileText className="w-4 h-4 flex-shrink-0" />
                        Polisni yuklab olish
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate("/user/login")}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Kabinetga o'tish
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="w-full py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      Asosiy sahifaga o'tish
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Not paid — response received but not confirmed */}
            {!confirmLoading && confirmResult && !(confirmResult.result === 0 && confirmResult.statusPayment === 2) && !confirmError && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">To'lov holati</p>
                  <button
                    onClick={() => setConfirmOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-5 py-6 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-base font-bold text-gray-900">To'lov kutilmoqda</p>
                  <p className="text-xs text-gray-400">To'lov hali tasdiqlanmagan. To'lovni amalga oshirgach qayta tekshiring.</p>
                  <div className="flex gap-2 w-full mt-1">
                    <button
                      onClick={() => setConfirmOpen(false)}
                      className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                      Yopish
                    </button>
                    <button
                      onClick={() => {
                        setConfirmResult(null);
                        setConfirmError(null);
                        setConfirmLoading(true);
                        osagoConfirmPayment(contract.sqbContractId)
                          .then((res) => setConfirmResult(res))
                          .catch((err) => setConfirmError(err?.response?.data?.message ?? "Xatolik yuz berdi."))
                          .finally(() => setConfirmLoading(false));
                      }}
                      className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Qayta tekshirish
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Error */}
            {!confirmLoading && confirmError && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">Xatolik</p>
                  <button
                    onClick={() => setConfirmOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-5 py-6 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-base font-bold text-gray-900">To'lov tasdiqlanmadi</p>
                  <p className="text-xs text-red-500">{confirmError}</p>
                  <div className="flex gap-2 w-full mt-1">
                    <button
                      onClick={() => setConfirmOpen(false)}
                      className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                      Yopish
                    </button>
                    <button
                      onClick={() => {
                        setConfirmError(null);
                        setConfirmResult(null);
                        setConfirmLoading(true);
                        osagoConfirmPayment(contract.sqbContractId)
                          .then((res) => setConfirmResult(res))
                          .catch((err) => setConfirmError(err?.response?.data?.message ?? "Xatolik yuz berdi."))
                          .finally(() => setConfirmLoading(false));
                      }}
                      className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Qayta tekshirish
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
      
    </div>
  );
};


export default PaymentPage;
import { useProfile, useTransactionInfo } from "@/store/useProfile";
import { Copy, CheckCircle2, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import img from "@/assets/empty.webp"
export default function ProfilePage() {
    const { data: user, isPending } = useProfile();
    const { data: TransactionInfo, isPending: TransactionLoad } = useTransactionInfo();
    const token = localStorage.getItem("token")
    const [copied, setCopied] = useState(false);
    const nav = useNavigate()
    const { t } = useTranslation()
    const copyReferral = () => {
        navigator.clipboard.writeText(user.data.referral.referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    useEffect(() => {
        if (!token) {
            nav("/user/login")
        }
    }, [token])
    console.log(TransactionInfo, "info")
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {isPending ? <Loader color="black" size={40} className=" animate-spin m-auto mt-40" />
                :
                <main className="max-w-6xl  mt-8 mx-auto p-6 md:p-10 space-y-8 mb-20 lg:mb-0">
                    <div className=" block gap-2 lg:grid grid-cols-2 flex-wrap  justify-between">
                        <div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900"></h1>
                                </div>

                                {/* <div className="px-4 py-2 rounded-full text-sm font-medium  bg-green-100 text-green-700 w-fit">
                            {user.data.status}
                        </div> */}
                            </div>

                            <div className="bg-white/70 backdrop-blur-xl border border-gray-200  rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-semibold text-gray-800">{t("profile.userInfo")}</h2>
                                    <p className="text-gray-700 font-mono text-lg">
                                        {user.data.phoneNumber}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                        {user.data.isVerified ? (
                                            <>
                                                <CheckCircle2 className="text-green-500 w-4 h-4" />
                                                <span className="text-green-600">{t("profile.verified")}</span>
                                            </>
                                        ) : (
                                            <span className="text-red-500">{t("profile.not_verif")}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="w-full text-lg font-semibold text-gray-800 mb-4">{t("profile.wallet")}</h2>
                                        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-2 gap-4">

                                            {[
                                                { label: t("profile.balance"), value: user.data.wallet.balance },
                                                { label: t("profile.cashback"), value: user.data.wallet.totalCashback },
                                                { label: t("profile.referral_bonus"), value: user.data.wallet.totalReferralBonus },
                                                { label: t("profile.total_earned"), value: user.data.wallet.totalEarned },
                                            ].map((item, i) => (
                                                <div
                                                    key={i+1}
                                                    className="bg-white rounded-xl p-5 w-full shadow-sm border hover:shadow-md transition"
                                                >
                                                    <p className="text-gray-500 text-sm">{item.label}</p>
                                                    <p className="text-xl font-bold text-gray-900 mt-1">
                                                        {item.value} UZS
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {t("profile.joined")}: {new Date(user.data.registeredAt).toLocaleDateString()}
                                </div>
                            </div>
                            {/* <div>
                            <h2 className="w-full text-lg font-semibold text-gray-800 mb-4">{t("profile.wallet")}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">

                                {[
                                    { label: t("profile.balance"), value: user.data.wallet.balance },
                                    { label: t("profile.cashback"), value: user.data.wallet.totalCashback },
                                    { label: t("profile.referral_bonus"), value: user.data.wallet.totalReferralBonus },
                                    { label: t("profile.total_earned"), value: user.data.wallet.totalEarned },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition"
                                    >
                                        <p className="text-gray-500 text-sm">{item.label}</p>
                                        <p className="text-xl font-bold text-gray-900 mt-1">
                                            {item.value} UZS
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                            <div>
                                <h2 className="text-lg mt-10 lg:mt-6 font-semibold text-gray-800 mb-4">{t("profile.referral")}</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="bg-white rounded-xl p-5 shadow-sm border">
                                        <p className="text-gray-500 text-sm mb-1">{t("profile.referal_code")}</p>
                                        <p className="text-lg font-bold tracking-wider">
                                            {user.data.referral.referralCode}
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow-sm border space-y-2">
                                        <p className="text-gray-500 text-sm">{t("profile.referal_link")}</p>

                                        <div className="flex items-center gap-2">
                                            <input
                                                value={user.data.referral.referralLink}
                                                readOnly
                                                className="flex-1 text-sm bg-gray-100 px-3 py-2 rounded-lg outline-none"
                                            />

                                            <button
                                                onClick={copyReferral}
                                                className="p-2 rounded-lg bg-gray-900 text-white hover:opacity-90 transition"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>

                                        {copied && (
                                            <span className="text-green-500 text-xs">
                                                {t("profile.copied")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow-sm border">
                                        <p className="text-gray-500 text-sm">{t("profile.users")}</p>
                                        <p className="text-xl font-bold">
                                            {user.data.referral.referredCount}
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl p-5 shadow-sm border">
                                        <p className="text-gray-500 text-sm">{t("profile.pur")}</p>
                                        <p className="text-xl font-bold">
                                            {user.data.referral.referralPurchases}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full hidden lg:block">
                            <div className="bg-white/70 backdrop-blur-xl border h-screen border-gray-200  rounded-2xl shadow p-6 ">
                            <h2 className="text-xl font-semibold text-gray-800">{t('transactions')}</h2>
                             <div className=" flex w-full justify-center">
                                <img src={img} alt="" className=" m-auto w-60" />
                             </div>
                            </div>
                        </div>
                    </div>
                </main>
            }
        </div>
    );
}

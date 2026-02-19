import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { MaskedInput } from "@/components/ui/maskedInput";
import { useAuth, useAuthVerify } from "@/store/useAuth";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Login() {
    const { mutate, isPending, isSuccess, error, data } = useAuth()
    const nav = useNavigate()
    const { mutate: verifyOtp, isPending: pendingOtp, data: dataVerify } = useAuthVerify({
        onSuccess: (res) => {
            if (res.data) {
                toast.success(res.message)
                localStorage.setItem("token", res?.data?.accessToken)
                localStorage.setItem("refresh", res?.data?.accessToken)
                localStorage.setItem("user", JSON.stringify(res?.data?.user))
                nav("/profile")
            }
        }
    })

    const [value, setValue] = useState("+998 ");
    const [otp, setOtp] = useState("");
    const { t } = useTranslation()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(value.replace(/\s/g, ""), "val");
        if (!value) return
        mutate({
            phoneNumber: value.replace(/\s/g, "")
        })
    };
    const handleOtp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(otp)
        verifyOtp({
            phoneNumber: value.replace(/\s/g, ""),
            otpCode: otp,
            referralCode: "ABC123"
        })
    };

    return (
        <>
            <section className="min-h-screen flex items-start sm:items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-3 sm:px-4 pt-16 sm:pt-0 pb-6">
                <div className="w-full max-w-md">
                    {data?.success ? <form onSubmit={handleOtp} className="relative backdrop-blur-xl bg-card/80 border border-border shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                        <div className="hidden sm:block absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full opacity-50" />
                        <div className="hidden sm:block absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full opacity-50" />
                        <div className="relative z-10">
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                                {data?.data}
                            </h2>
                            {/* <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
                                {t("login.enter")}
                            </p> */}
                            <div className="m-auto w-full   sm:space-y-4">
                                <div className="flex w-full m-auto justify-center ">
                                    <InputOTP maxLength={6} autoFocus value={otp} onChange={setOtp}>
                                        <InputOTPGroup >
                                            <InputOTPSlot  index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <br />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full  h-12 sm:h-14 rounded-xl text-base font-semibold shadow-md sm:shadow-lg active:scale-[0.98] sm:hover:scale-[1.02] transition-transform"
                                    disabled={otp.length < 6 || pendingOtp}
                                >
                                    {pendingOtp ?
                                        <Loader className=" animate-spin" />
                                        :
                                        t("login.continue")
                                    }
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-5 sm:mt-6 leading-relaxed">
                                {t("login.info")}{" "}
                                <a href="#" className="underline">
                                    {t("login.tp")}
                                </a>
                            </p>
                        </div>
                    </form>
                        :
                        <form onSubmit={handleSubmit} className="relative backdrop-blur-xl bg-card/80 border border-border shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                            <div className="hidden sm:block absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full opacity-50" />
                            <div className="hidden sm:block absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full opacity-50" />

                            <div className="relative z-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                                    {t("login.welcome")} 👋
                                </h2>
                                <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
                                    {t("login.enter")}
                                </p>
                                <div className="space-y-3 sm:space-y-4">
                                    <MaskedInput
                                        autoFocus
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        mask="+998 99 999 99 99"
                                        placeholder="+998 90 123 45 67"
                                        className="h-12 sm:h-14 text-base rounded-xl"
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-12 sm:h-14 rounded-xl text-base font-semibold shadow-md sm:shadow-lg active:scale-[0.98] sm:hover:scale-[1.02] transition-transform"
                                        disabled={value.length < 17 || isPending}
                                    >
                                        {isPending ?
                                            <Loader className=" animate-spin" />
                                            :
                                            t("login.continue")
                                        }
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-5 sm:mt-6 leading-relaxed">
                                    {t("login.info")}{" "}
                                    <a href="#" className="underline">
                                        {t("login.tp")}
                                    </a>
                                </p>
                            </div>
                        </form>
                    }

                </div>
            </section>
        </>
    );
}

export default Login;

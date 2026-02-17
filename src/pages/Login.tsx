import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { MaskedInput } from "@/components/ui/maskedInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Login() {
    const [value, setValue] = useState("+998 ");
    const { t } = useTranslation()
    return (
        <>
            <section className="min-h-screen flex items-start sm:items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-3 sm:px-4 pt-16 sm:pt-0 pb-6">

                <div className="w-full max-w-md">

                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-card/80 border border-border shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8">

                        {/* Glow (lighter on mobile) */}
                        <div className="hidden sm:block absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full opacity-50" />
                        <div className="hidden sm:block absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full opacity-50" />

                        <div className="relative z-10">

                            {/* Title */}
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                                {t("login.welcome")} 👋
                            </h2>

                            <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
                                {t("login.enter")}
                            </p>

                            {/* Input */}
                            <div className="space-y-3 sm:space-y-4">
                                <MaskedInput
                                    autoFocus
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    mask="+998 99 999 99 99"
                                    placeholder="+998 90 123 45 67"
                                    className="h-12 sm:h-14 text-base rounded-xl"
                                />

                                {/* Button */}
                                <Button
                                    size="lg"
                                    className="w-full h-12 sm:h-14 rounded-xl text-base font-semibold shadow-md sm:shadow-lg active:scale-[0.98] sm:hover:scale-[1.02] transition-transform"
                                    disabled={value.length < 17}
                                >
                                    {t("login.continue")}
                                </Button>
                            </div>

                            {/* Footer */}
                            <p className="text-xs text-muted-foreground text-center mt-5 sm:mt-6 leading-relaxed">
                                {t("login.info")}{" "}
                                <a href="#" className="underline">
                                    {t("login.tp")}
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Login;

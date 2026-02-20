import { Home, Grid2X2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
type Types = {
    id: string;
    label: string;
    icon: any;
    link: string;
}

export default function MobileDock() {
    const [active, setActive] = useState("home");
    const nav = useNavigate()
    const handleClick = (tab: Types) => {
        setActive(tab.id);
        nav(tab.link)
    }
    
    const {t} = useTranslation()
    const tabs: Types[] = [
        { id: "home", label: t("home_tab"), icon: Home, link: "/" },
        { id: "category", label:  t("category_tab"), icon: Grid2X2, link: "/category" },
        { id: "profile", label:  t("profile_tab"), icon: User, link: "/profile" },
    ];
    useEffect(()=>{
        if(location.pathname === '/user/login'){
            setActive("profile")
        }
    },[])
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
            {/* Glass container */}
            <div className="flex justify-between items-center px-4 py-2 rounded-2xl backdrop-blur-xl bg-background/80 border border-border shadow-2xl">

                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleClick(tab)}
                            className={
                                cn(
                                    "flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "text-primary scale-105"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                        >
                            <Icon size={22} strokeWidth={2} />
                            <span className="text-xs mt-1">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div >
    );
}

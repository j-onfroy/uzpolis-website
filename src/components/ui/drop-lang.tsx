import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Shield } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

function DropLang() {
    const { i18n } = useTranslation()
  const queryClient = useQueryClient();

    const lang = [
        { value: 'uz', label: 'Uzbek' },
        { value: 'ru', label: 'Русский' },
        { value: 'en', label: 'English' },
    ]
    const onChangeLanguage = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem("language", value);
        queryClient.invalidateQueries();

    }
    return (
        <header className="flex items-center justify-between  absolute top-1 z-50 w-full px-3">
            <div className="flex items-center gap-2 bg-white p-1 rounded-md" >
                {/* <a href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center ">
                        <Shield className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground ">UzPolis</span>
                </a> */}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className=" border border-black p-2 rounded-md text-black  outline-none text-sm ml-6 md:ml-0">
                            {lang.find(l => l.value === i18n.language)?.label}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {lang.map(el => (
                            <DropdownMenuItem
                                key={el.value}
                                onClick={() => onChangeLanguage(el.value)}
                            >
                                {el.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default DropLang

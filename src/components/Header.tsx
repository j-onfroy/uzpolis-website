import { Shield, Menu, X, CircleUserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const { i18n, t } = useTranslation()
  const nav = useNavigate()
  const lang = [
    { value: 'uz', label: 'Uzbek' },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ]
  const onChangeLanguage = (value: any) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    queryClient.invalidateQueries();
  }
  console.log(user, "user")
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-13 lg: h-16">
            {/* Logo */}
            <div className="flex items-center gap-2" >
              <a href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center ">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">UzPolis</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                E-OSAGO
              </a>
              {/* <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                KASKO
              </a> */}
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                B2B
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                {t("collab")}
              </a>
              {/* <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Контакты
            </a> */}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center shado gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className=" outline-none text-sm ml-6 md:ml-0">
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
              {
                user?.phoneNumber ?
                  <div onClick={() => nav("/profile")} className=" cursor-pointer flex gap-2 text-[#023e8a] items-center p-2 rounded-md border">
                    <p> {user?.phoneNumber}</p>
                    <CircleUserRound size={30} color="#023e8a" />
                  </div>
                  :
                  <Button onClick={() => nav("/user/login")}>{t("home.login")}</Button>
              }
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-4">
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                  Услуги
                </a>
                <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                  Преимущества
                </a>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                  Как это работает
                </a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium py-2">
                  Контакты
                </a>
                <div className="pt-4 border-t border-border">
                  <Button className="w-full">Получить полис</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header >
    </>
  );
};

export default Header;

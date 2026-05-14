// import { Menu, X, CircleUserRound } from "lucide-react";
// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// import logo from "@/assets/logo.png";

// interface HeaderProps {
//   transparent?: boolean;
// }

// const Header = ({ transparent = false }: HeaderProps) => {
//   const queryClient = useQueryClient();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const { i18n, t } = useTranslation();
//   const nav = useNavigate();
//   const lang = [
//     { value: "uz", label: "Uzbek" },
//     { value: "ru", label: "Русский" },
//     { value: "en", label: "English" },
//   ];

//   useEffect(() => {
//     if (!transparent) return;
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [transparent]);

//   const isTransparent = transparent && !scrolled;

//   const onChangeLanguage = (value: string) => {
//     i18n.changeLanguage(value);
//     localStorage.setItem("language", value);
//     queryClient.invalidateQueries();
//   };

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isTransparent
//             ? "bg-transparent border-transparent"
//             : "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm"
//         }`}
//       >
//         <div className="container mx-auto md:px-28">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <a href="/" className="flex items-center gap-2">
//               <img
//                 src={logo}
//                 alt="Uzpolis"
//                 width="60px"
//                 className={isTransparent ? "brightness-0 invert" : ""}
//               />
//             </a>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-8">
//               <a
//                 href="#services"
//                 className={`transition-colors font-medium text-sm ${
//                   isTransparent
//                     ? "text-white/80 hover:text-white"
//                     : "text-muted-foreground hover:text-primary"
//                 }`}
//               />
//             </nav>

//             {/* Desktop CTA */}
//             <div className="hidden lg:flex items-center gap-4">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button
//                     className={`outline-none text-sm ${
//                       isTransparent ? "text-white/80 hover:text-white" : "text-foreground"
//                     }`}
//                   >
//                     {lang.find((l) => l.value === i18n.language)?.label}
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   {lang.map((el) => (
//                     <DropdownMenuItem key={el.value} onClick={() => onChangeLanguage(el.value)}>
//                       {el.label}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               {user?.phoneNumber ? (
//                 <div
//                   onClick={() => nav("/profile")}
//                   className={`cursor-pointer flex gap-2 items-center px-3 py-2 rounded-md border transition-colors ${
//                     isTransparent
//                       ? "border-white/30 text-white hover:bg-white/10"
//                       : "border-border text-[#023e8a]"
//                   }`}
//                 >
//                   <p className="text-sm">{user?.phoneNumber}</p>
//                   <CircleUserRound size={24} />
//                 </div>
//               ) : (
//                 <Button
//                   onClick={() => nav("/user/login")}
//                   variant={isTransparent ? "outline" : "default"}
//                   className={
//                     isTransparent
//                       ? "border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white"
//                       : ""
//                   }
//                 >
//                   {t("home.login")}
//                 </Button>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className={`lg:hidden p-2 ${isTransparent ? "text-white" : "text-foreground"}`}
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div
//               className={`lg:hidden py-4 border-t animate-fade-in ${
//                 isTransparent ? "border-white/20 bg-[#020f2b]/80 backdrop-blur-sm" : "border-border"
//               }`}
//             >
//               <nav className="flex flex-col gap-4 px-2">
//                 {user?.phoneNumber ? (
//                   <div
//                     onClick={() => nav("/profile")}
//                     className="cursor-pointer flex gap-2 items-center p-2 rounded-md border border-border text-[#023e8a]"
//                   >
//                     <p>{user?.phoneNumber}</p>
//                     <CircleUserRound size={30} color="#023e8a" />
//                   </div>
//                 ) : (
//                   <Button onClick={() => nav("/user/login")}>{t("home.login")}</Button>
//                 )}
//                 <div className="flex gap-2">
//                   {lang.map((el) => (
//                     <button
//                       key={el.value}
//                       onClick={() => onChangeLanguage(el.value)}
//                       className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
//                         i18n.language === el.value
//                           ? "border-primary text-primary bg-primary/5"
//                           : isTransparent
//                           ? "border-white/20 text-white/70"
//                           : "border-border text-muted-foreground"
//                       }`}
//                     >
//                       {el.label}
//                     </button>
//                   ))}
//                 </div>
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;
import { useState } from 'react'
import { ChevronDown, Phone, Menu, X, Share2, PlayCircle } from 'lucide-react'
import logo from "@/assets/logo.png";
const products = [
  { label: 'OSAGO', href: '#' },
  { label: 'KASKO', href: '#' },
  { label: 'Sayohat', href: '#' },
  { label: 'Uy-joy', href: '#' },
  { label: "Hayot va sog'liq", href: '#' },
]

const navLinks = [
  { label: "Sug'urtalar", dropdown: products },
  { label: 'Qanday ishlaydi', href: '#' },
  { label: 'Savol-javob', href: '#' },
  { label: 'Blog', href: '#' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="bg-white text-black sticky top-0 z-50">
      <div className="max-w-[1216px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className=" flex md:hidden items-center gap-2 shrink-0">
         <span className="font-bold text-lg tracking-tight">uzpolis</span> 
        </a>
        <a href="/" className=' hidden md:flex'>
          <img
            src={logo}
            alt="Uzpolis"
            width="60px"
          />
        </a>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center hover:text-blue-400  gap-1 px-3 py-2 rounded-lg text-sm text-black/80  hover:bg-white/10 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-[14px] shadow-card py-2 min-w-[180px] z-50">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm hover:text-blue-400  text-ink hover:bg-bg hover:text-blue-2 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-black/80  hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="bg-white/10 hover:bg-white/20 rounded-lg w-8 h-8 flex items-center justify-center transition-colors">
            <Share2 size={16} />
          </a>
          <a href="#" className="bg-white/10 hover:bg-white/20 rounded-lg w-8 h-8 flex items-center justify-center transition-colors">
            <PlayCircle size={16} />
          </a>
          <a href="/user/login" className="bg-[#1f4fd9] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Kirish
          </a>
        </div>

        {/* Mobile menu btn */}
        {/* <button className="md:hidden text-black" onClick={() => setMobileOpen(!mobileOpen)}> */}
        {/* {mobileOpen ? <X size={22} /> : <Menu size={22} />} */}
        <a href="/user/login" className="bg-[#1f4fd9] md:hidden text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Kirish
        </a>
        {/* </button> */}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1B3D] px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <p className="px-3 py-2 text-sm font-semibold text-white/60 uppercase tracking-wider">{link.label}</p>
                {link.dropdown.map((item) => (
                  <a key={item.label} href={item.href} className="block px-5 py-2 text-sm text-white/80 hover:text-blue-2 hover:bg-white/10 transition-colors rounded-lg">
                    {item.label}
                  </a>
                ))}
              </div>
            ) : (
              <a key={link.label} href={link.href} className="block px-3 py-2 text-sm text-white/80 hover:text-blue-2 rounded-lg hover:bg-white/10 transition-colors">
                {link.label}
              </a>
            )
          )}
          <div className="pt-2 border-t bg-[#0B1B3D] border-white/10">

            <a href="/user/login" className="block mt-2 bg-[#1f4fd9] text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
              Kirish
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

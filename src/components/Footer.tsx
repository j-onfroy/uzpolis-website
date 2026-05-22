import logo from "@/assets/logo.png";
import { Send, Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground pt-14 pb-6">
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <img src={logo} alt="Uzpolis" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <p className="text-base font-bold leading-none">UZPOLIS</p>
                <p className="text-[14px] text-primary-foreground/50 leading-none mt-0.5">
                  Sug'urta agent marketplace
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-5">
              Sug'urtani oson, tez va ishonchli rasmiylashtiring.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Send, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary-foreground/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Mahsulotlar */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Mahsulotlar</h4>
            <ul className="space-y-2.5">
              {["OSAGO", "KASKO", "Travel"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Foydali */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Foydali</h4>
            <ul className="space-y-2.5">
              {["Qanday ishlaydi", "Savol-javob", "Yangliklar"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Yordam */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Yordam</h4>
            <ul className="space-y-2.5">
              {["Aloqa", "Chat-bot", "Shartlar va qoidalar"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bog'lanish */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Biz bilan bog'laning</h4>
            <ul className="space-y-3">
              <li>
              
              </li>
              <li>
                <a href="mailto:info@uzpolis.uz" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  info@uzpolis.uz
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-primary-foreground/60 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Toshkent, O'zbekiston
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} UZPOLIS. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

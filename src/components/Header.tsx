import { Button } from "@/components/ui/button";
import { Shield, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center ">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">UzPolis</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              E-OSAGO
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              KASKO
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              B2B
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Hamkorlik
            </a>
            {/* <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Контакты
            </a> */}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center shado gap-4">
            {/* <a href="tel:+78001234567" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-medium">8-800-123-45-67</span>
            </a> */}
            <Button>Shaxsiy kabinet</Button>
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
    </header>
  );
};

export default Header;

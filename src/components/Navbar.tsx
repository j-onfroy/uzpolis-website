import { Car, Shield, Plane, Home, Zap, Globe } from "lucide-react";
import { Button } from "./ui/baseButton";
const navItems = [
  { icon: Car, label: "ОСАГО" },
  { icon: Shield, label: "КАСКО" },
  { icon: Plane, label: "Путешествие" },
  { icon: Home, label: "Имущество" },
  { icon: Zap, label: "Быстрые услуги" },
];

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border/50">
    <div className="container mx-auto flex items-center justify-between h-16 px-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">uzpolis</span>
        <span className="text-xs text-muted-foreground">sug'urta</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 text-sm text-muted-foreground">
          <Globe className="w-4 h-4" />
          RU
        </button>
        <Button size="sm">Вход</Button>
      </div>
    </div>
  </nav>
);

export default Navbar;

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[18px] w-[18px] shrink-0 rounded-md border border-[#e5e7eb] bg-white transition-all duration-150 outline-none select-none cursor-pointer",
      "data-[state=checked]:border-[#2563eb] data-[state=checked]:bg-[#eff6ff]",
      "focus-visible:border-[#2563eb] focus-visible:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]",
      "data-[state=checked]:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Check size={12} strokeWidth={2.5} color="#2563eb" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

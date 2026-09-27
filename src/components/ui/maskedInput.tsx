import * as React from "react";
import InputMask from "react-input-mask";
import { cn } from "@/lib/utils";

type MaskedInputProps = React.ComponentProps<"input"> & {
  mask: string;
};

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, ...props }, ref) => {
    return (
      <InputMask mask={mask} {...props}>
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input
            {...inputProps}
            ref={ref}
            className={cn(
              "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 md:text-sm",
              className
            )}
          />
        )}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };

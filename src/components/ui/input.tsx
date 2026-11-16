import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-full bg-[#f5f5f5] px-4 py-2 text-sm text-[#111111] placeholder:text-[#707072] border border-transparent transition-colors focus-visible:outline-none focus-visible:bg-white focus-visible:border-[#111111] focus-visible:ring-1 focus-visible:ring-[#111111] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

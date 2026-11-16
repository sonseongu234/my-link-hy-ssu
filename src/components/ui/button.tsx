import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#111111] text-white hover:bg-[#39393b] shadow-sm",
        nikePrimary:
          "bg-[#111111] text-white hover:bg-[#2b2b2d] shadow-sm",
        nikeSecondary:
          "bg-[#f5f5f5] text-[#111111] hover:bg-[#e5e5e5] border border-[#cacacb]",
        nikeOutline:
          "bg-white text-[#111111] border border-[#cacacb] hover:border-[#111111]",
        ghost:
          "hover:bg-[#f5f5f5] text-[#111111]",
        link:
          "text-[#111111] underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-[#d30005] text-white hover:bg-[#780700]",
      },
      size: {
        default: "h-11 px-6 text-[14px]",
        sm: "h-9 px-4 text-[12px]",
        lg: "h-12 px-8 text-[15px]",
        icon: "h-10 w-10 p-0 rounded-full",
        iconSm: "h-8 w-8 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

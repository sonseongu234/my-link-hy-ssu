import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#111111] text-white hover:bg-[#39393b]",
        secondary:
          "border border-[#cacacb] bg-[#f5f5f5] text-[#111111] hover:bg-[#e5e5e5]",
        outline:
          "border border-[#cacacb] text-[#707072]",
        justIn:
          "border-transparent text-[#d30005] font-bold tracking-wider uppercase bg-[#d30005]/10 px-2 py-0.5",
        member:
          "border-transparent bg-[#111111] text-[#cacacb] text-[10px] tracking-widest uppercase",
        sale:
          "border-transparent text-[#d30005] bg-[#d30005]/10 font-bold",
        success:
          "border-transparent text-[#007d48] bg-[#007d48]/10 font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

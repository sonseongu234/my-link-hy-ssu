"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export interface NikeCardItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
  price?: string;
  salePrice?: string;
  originalPrice?: string;
  discountRate?: string;
  swatches?: { name: string; color: string }[];
  graphic: React.ReactNode;
  actionText: string;
}

interface ProductCardProps {
  item: NikeCardItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [activeSwatch, setActiveSwatch] = useState(0);

  return (
    <div className="group flex flex-col bg-white rounded-none border-0 shadow-none text-left select-none">
      {/* 1:1 SQUARE PRODUCT IMAGE / GRAPHIC STAGE */}
      <div className="relative w-full aspect-square bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
        {/* PROMO BADGE (TOP-LEFT OF CARD) */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-white text-[#111111] text-[12px] font-medium tracking-wide uppercase px-3 py-1 rounded-full border border-[#cacacb]">
              {item.badge}
            </span>
          </div>
        )}

        {/* GRAPHIC STAGE */}
        <div className="w-full h-full flex items-center justify-center p-8 transition-transform duration-300 group-hover:scale-105">
          {item.graphic}
        </div>
      </div>

      {/* METADATA ROWS WITH 8px (spacing.sm) GAP */}
      <div className="pt-3 flex flex-col gap-1">
        {/* SWATCH DOT ROW (12px circular with active concentric ring) */}
        {item.swatches && item.swatches.length > 0 && (
          <div className="flex items-center gap-2 mb-1">
            {item.swatches.map((swatch, idx) => {
              const isActive = activeSwatch === idx;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setActiveSwatch(idx)}
                  title={swatch.name}
                  className={`w-3 h-3 rounded-full transition-all duration-150 ${
                    isActive
                      ? "ring-2 ring-offset-2 ring-[#111111]"
                      : "opacity-80 hover:opacity-100"
                  } ${
                    swatch.color.toLowerCase() === "#ffffff"
                      ? "border border-[#cacacb]"
                      : ""
                  }`}
                  style={{ backgroundColor: swatch.color }}
                />
              );
            })}
            <span className="text-[12px] text-[#707072] font-medium ml-1">
              {item.swatches.length} Colors
            </span>
          </div>
        )}

        {/* PRODUCT NAME (typography.body-strong: 16px, 500, #111111) */}
        <h3 className="text-[16px] font-medium text-[#111111] leading-tight group-hover:text-[#707072] transition-colors">
          {item.title}
        </h3>

        {/* CATEGORY SUBTITLE (typography.caption-md: 14px, 500, #707072) */}
        <p className="text-[14px] font-medium text-[#707072] leading-tight">
          {item.subtitle}
        </p>

        {/* PRICE ROW */}
        <div className="pt-1 flex items-center gap-2 text-[16px] font-medium leading-tight">
          {item.salePrice ? (
            <>
              <span className="text-[#d30005]">{item.salePrice}</span>
              {item.originalPrice && (
                <span className="text-[#707072] line-through text-[14px]">
                  {item.originalPrice}
                </span>
              )}
              {item.discountRate && (
                <span className="text-[#d30005] text-[13px] font-medium">
                  {item.discountRate} off
                </span>
              )}
            </>
          ) : (
            <span className="text-[#111111]">{item.price || "Free Access"}</span>
          )}
        </div>

        {/* PILL CTA (button-primary: #111111, rounded-full 30px, 48px height) */}
        <div className="pt-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full h-[48px] px-6 rounded-full bg-[#111111] text-white text-[15px] font-medium transition-all duration-150 active:scale-95 active:opacity-70 hover:bg-[#39393b]"
          >
            <span>{item.actionText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

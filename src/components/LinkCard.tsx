import React from "react";
import { LinkItem } from "@/types/link";
import { ArrowUpRight } from "lucide-react";

interface LinkCardProps {
  link: LinkItem;
  iconNode?: React.ReactNode;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, iconNode }) => {
  const bgClass = link.bgColor || "bg-white";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-between p-4 sm:p-5 ${bgClass} border-[3px] border-black rounded-xl shadow-neo hover:shadow-neo-xl hover:-translate-x-0.5 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-neo-sm transition-all duration-150 cursor-pointer overflow-hidden`}
    >
      {/* Top right tag pill if exists */}
      {link.badge && (
        <span className="absolute -top-1 right-4 bg-black text-[#FFE600] text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 border border-black shadow-neo-sm">
          {link.badge}
        </span>
      )}

      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
        {(iconNode || link.icon) && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white border-2 border-black shadow-neo-sm flex items-center justify-center text-black group-hover:rotate-6 group-hover:scale-105 transition-transform duration-200">
            {iconNode || <span className="text-2xl">{link.icon}</span>}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base sm:text-lg text-black tracking-tight truncate">
              {link.title}
            </h3>
            {link.tag && (
              <span className="hidden sm:inline-block text-[10px] font-black bg-black text-white px-2 py-0.5 rounded border border-black">
                {link.tag}
              </span>
            )}
          </div>
          {link.description && (
            <p className="text-xs sm:text-sm font-semibold text-black/80 truncate mt-0.5">
              {link.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center gap-1.5">
        <span className="hidden xs:inline-flex items-center gap-1 bg-black text-white text-xs font-black px-3 py-1.5 border-2 border-black rounded-md group-hover:bg-white group-hover:text-black transition-colors shadow-neo-sm">
          VISIT
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
        </span>
        <span className="xs:hidden w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center border-2 border-black group-hover:bg-white group-hover:text-black transition-colors shadow-neo-sm">
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        </span>
      </div>
    </a>
  );
};

import React from "react";
import { LinkItem } from "@/types/link";

interface LinkCardProps {
  link: LinkItem;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full p-4 mb-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {link.icon && (
            <span className="text-2xl p-2 bg-slate-100 dark:bg-slate-700/60 rounded-xl group-hover:scale-110 transition-transform duration-200">
              {link.icon}
            </span>
          )}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {link.title}
            </h3>
            {link.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {link.description}
              </p>
            )}
          </div>
        </div>
        <div className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  );
};

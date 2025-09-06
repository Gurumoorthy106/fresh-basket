import React from "react";

export function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full 
      bg-emerald-100 text-emerald-700 
      dark:bg-emerald-700 dark:text-emerald-100 ${className}`}
    >
      {children}
    </span>
  );
}

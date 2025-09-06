import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-xl border border-gray-300 
      shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 
      dark:bg-gray-700 dark:text-white ${className}`}
      {...props}
    />
  );
}


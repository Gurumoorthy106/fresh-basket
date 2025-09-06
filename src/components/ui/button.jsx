import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl font-medium shadow-md 
        bg-emerald-600 text-white hover:bg-emerald-700 
        transition-all duration-200 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

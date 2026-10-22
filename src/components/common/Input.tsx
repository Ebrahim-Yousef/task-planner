import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-rose-500 focus:ring-rose-200"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose-500 font-medium">{error}</span>
      )}
    </div>
  );
};

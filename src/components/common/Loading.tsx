import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const Loading: React.FC<LoadingSpinnerProps> = ({
  message = "جاري تحميل البيانات...",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-100/90 backdrop-blur-xs transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 animate-in fade-in zoom-in-95">
        {/* Spinner أنيق باستخدام Tailwind CSS v4 */}
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
          <div className="absolute w-6 h-6 rounded-full bg-indigo-600/10"></div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-bold text-slate-800 text-base">Task Planner</h3>
          <p className="text-xs text-slate-500 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

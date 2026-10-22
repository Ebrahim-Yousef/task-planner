import React, { useEffect } from "react";
import type { ToastMessage, ToastType } from "../../types/toast";

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  // تخصيص الألوان لكل حدث بناءً على رغبتك
  const bgColors: Record<ToastType, string> = {
    add: "bg-indigo-600 text-white", // لون زر الإضافة الأساسي
    update: "bg-emerald-600 text-white", // اللون الأخضر للتعديل
    delete: "bg-rose-600 text-white", // اللون الأحمر للحذف
    info: "bg-slate-800 text-white", // للنقل أو الحالات العامة
  };

  const icons: Record<ToastType, string> = {
    add: "+",
    update: "✓",
    delete: "✕",
    info: "ℹ",
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-300 font-medium text-sm ${
        bgColors[toast.type]
      }`}
    >
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/25 text-xs font-bold shrink-0">
        {icons[toast.type]}
      </div>
      <span>{toast.message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};

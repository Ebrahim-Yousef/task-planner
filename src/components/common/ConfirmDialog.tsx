import React from "react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-slate-100 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()} // منع إغلاق الـ Modal عند الضغط داخله
      >
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-6">{message}</p>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            تأكيد الحذف
          </Button>
        </div>
      </div>
    </div>
  );
};

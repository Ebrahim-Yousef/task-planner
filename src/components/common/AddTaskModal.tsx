import React, { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import { Button } from "./Button";
import { Input } from "./Input";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
  }) => void;
  editingTask?: Task | null;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTask,
}) => {
  // تهيئة الحالة مرة واحدة عند إنشاء المكون باستخدام الـ key القادم من الأب
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || "",
  );
  const [status, setStatus] = useState<TaskStatus>(
    editingTask?.status || "todo",
  );
  const [priority, setPriority] = useState<TaskPriority>(
    editingTask?.priority || "medium",
  );
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("عنوان المهمة مطلوب");
      return;
    }

    onSave({ title, description, status, priority });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-100 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          {editingTask ? "تعديل المهمة" : "إضافة مهمة جديدة"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="عنوان المهمة"
            placeholder="مثال: تطوير واجهة المستخدم..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-slate-700">الوصف</label>
            <textarea
              rows={3}
              placeholder="اكتب تفاصيل إضافية عن المهمة..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                الحالة
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                <option value="todo">قيد الانتظار</option>
                <option value="in_progress">جاري العمل</option>
                <option value="completed">مكتملة</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                الأولوية
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">عالية</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" variant="primary">
              {editingTask ? "تحديث المهمة" : "حفظ المهمة"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

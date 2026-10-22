import React, { useState } from "react";
import type { Task, TaskStatus } from "../../types/task";
import { Button } from "./Button";
import { ConfirmDialog } from "./ConfirmDialog";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onMove,
  onEdit,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const priorityColors = {
    low: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    medium: "bg-amber-50 text-amber-700 border-amber-200/60",
    high: "bg-rose-50 text-rose-700 border-rose-200/60",
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-3 group">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-slate-800 text-base leading-snug wrap-break-word">
            {task.title}
          </h4>
          <span
            className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="text-slate-500 text-sm leading-relaxed wrap-break-word">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
          <div className="flex items-center gap-1">
            {task.status !== "todo" && (
              <button
                title="نقل للخلف"
                onClick={() =>
                  onMove(
                    task.id,
                    task.status === "completed" ? "in_progress" : "todo",
                  )
                }
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-xs font-bold cursor-pointer"
              >
                ←
              </button>
            )}
            {task.status !== "completed" && (
              <button
                title="نقل للأمام"
                onClick={() =>
                  onMove(
                    task.id,
                    task.status === "todo" ? "in_progress" : "completed",
                  )
                }
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-xs font-bold cursor-pointer"
              >
                →
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="outline" onClick={() => onEdit(task)}>
              تعديل
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setIsConfirmOpen(true)}
            >
              حذف
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="حذف المهمة"
        message="هل أنت متأكد من رغبتك في حذف هذه المهمة؟ لا يمكن التراجع عن هذا الإجراء."
        onConfirm={() => {
          onDelete(task.id);
          setIsConfirmOpen(false);
        }}
        onClose={() => setIsConfirmOpen(false)}
      />
    </>
  );
};

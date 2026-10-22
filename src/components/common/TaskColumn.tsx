import React from "react";
import type { Task, TaskStatus } from "../../types/task";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  badgeColor: string;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onDelete,
  onMove,
  onEdit,
  badgeColor,
}) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl p-4 flex flex-col gap-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-3.5 h-3.5 rounded-full shadow-xs ${badgeColor}`}
          ></span>
          <h3 className="font-bold text-slate-800 text-base">{title}</h3>
        </div>
        <span className="bg-white text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200/60 shadow-2xs">
          {filteredTasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 pl-1 scrollbar-none">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-medium gap-1">
            <span>لا توجد مهام هنا</span>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onMove={onMove}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

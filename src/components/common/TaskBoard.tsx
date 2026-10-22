import React from "react";
import type { Task, TaskStatus } from "../../types/task";
import { TaskColumn } from "./TaskColumn";

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onDelete,
  onMove,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TaskColumn
        title="قيد الانتظار"
        status="todo"
        tasks={tasks}
        onDelete={onDelete}
        onMove={onMove}
        onEdit={onEdit}
        badgeColor="bg-amber-500"
      />
      <TaskColumn
        title="جاري العمل"
        status="in_progress"
        tasks={tasks}
        onDelete={onDelete}
        onMove={onMove}
        onEdit={onEdit}
        badgeColor="bg-indigo-500"
      />
      <TaskColumn
        title="مكتملة"
        status="completed"
        tasks={tasks}
        onDelete={onDelete}
        onMove={onMove}
        onEdit={onEdit}
        badgeColor="bg-emerald-500"
      />
    </div>
  );
};

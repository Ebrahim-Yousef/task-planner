import { useReducer, useEffect, useState, useCallback } from "react";
import type { Task, TaskStatus, TaskPriority } from "./types/task";
import type { ToastMessage, ToastType } from "./types/toast";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { taskReducer } from "./reducers/taskReducer";
import { TaskBoard } from "./components/common/TaskBoard";
import { AddTaskModal } from "./components/common/AddTaskModal";
import { Button } from "./components/common/Button";
import { Loading } from "./components/common/Loading";
import { Toast } from "./components/common/Toast";

const INITIAL_TASKS: Task[] = [];

export default function App() {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>(
    "tasks_planner_data",
    INITIAL_TASKS,
  );
  const [tasks, dispatch] = useReducer(taskReducer, storedTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // حالة الـ Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "add") => {
    setToast({
      id: Date.now().toString(),
      message,
      type,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const handleSaveTask = (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
  }) => {
    if (editingTask) {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          ...editingTask,
          ...taskData,
        },
      });
      showToast("تم تحديث المهمة بنجاح!", "update");
    } else {
      dispatch({ type: "ADD_TASK", payload: taskData });
      showToast("تمت إضافة المهمة بنجاح!", "add");
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
    showToast("تم حذف المهمة بنجاح", "delete");
  };

  const handleMoveTask = (id: string, status: TaskStatus) => {
    dispatch({ type: "MOVE_TASK", payload: { id, status } });
    showToast("تم نقل المهمة بنجاح", "info");
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Loading message="جاري تهيئة لوحة المهام..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
              TP
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900">Task Planner</h1>
              <p className="text-xs text-slate-500">
                مفكرة إدارة المهام الاحترافية
              </p>
            </div>
          </div>

          <Button variant="primary" onClick={handleOpenAddModal}>
            + إضافة مهمة جديدة
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskBoard
          tasks={tasks}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
          onEdit={handleOpenEditModal}
        />
      </main>

      <AddTaskModal
        key={
          isModalOpen
            ? editingTask
              ? editingTask.id
              : "create-mode"
            : "closed"
        }
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* مكون الإشعار المنبثق */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

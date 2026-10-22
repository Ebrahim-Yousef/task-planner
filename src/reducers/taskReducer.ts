import type { Task, TaskAction } from "../types/task";

export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;

    case "ADD_TASK": {
      const newTask: Task = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
        priority: action.payload.priority,
        createdAt: new Date().toISOString(),
      };
      return [newTask, ...state];
    }

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "MOVE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task,
      );

    default:
      return state;
  }
};

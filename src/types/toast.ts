export type ToastType = "add" | "update" | "delete" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

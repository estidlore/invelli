import { create } from "zustand";

type ToastType = "error" | "info" | "neutral" | "success" | "warning";

interface ToastState {
  showToast: (message: string, type?: ToastType) => void;
  toast: {
    message: string;
    type: ToastType;
  } | null;
}

const useToastStore = create<ToastState>((set) => ({
  showToast: (message, type: ToastType = "neutral"): void => {
    set({ toast: { message, type } });
    setTimeout((): void => {
      set({ toast: null });
    }, 2000);
  },
  toast: null,
}));

export type { ToastType };
export { useToastStore };

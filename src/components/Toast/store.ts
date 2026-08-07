import { create } from "zustand";

type ToastType = "error" | "info" | "neutral" | "success" | "warning";

interface ToastState {
  hideToast: () => void;
  showToast: (message: string, type?: ToastType) => void;
  toast: {
    message: string;
    type: ToastType;
  } | null;
}

let toastTimeoutId: NodeJS.Timeout | number | null = null;

const useToastStore = create<ToastState>((set) => ({
  hideToast: (): void => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
      toastTimeoutId = null;
    }
    set({ toast: null });
  },

  showToast: (message, type: ToastType = "neutral"): void => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    set({ toast: { message, type } });
    toastTimeoutId = setTimeout((): void => {
      set({ toast: null });
      toastTimeoutId = null;
    }, 3000);
  },

  toast: null,
}));

export type { ToastType };
export { useToastStore };

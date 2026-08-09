type ShowToast = (message: string, type?: ToastType) => void;
type ToastType = "error" | "info" | "neutral" | "success" | "warning";

interface ToastState {
  hideToast: () => void;
  showToast: ShowToast;
  toast: {
    message: string;
    type: ToastType;
  } | null;
}

export type { ShowToast, ToastType, ToastState };

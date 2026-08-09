import { useToastStore } from "./store";
import type { ShowToast } from "./types";

const useToast = (): ShowToast => {
  const showToast = useToastStore((state) => state.showToast);

  return showToast;
};

export { useToast };

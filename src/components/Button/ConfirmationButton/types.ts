import type { ButtonProps } from "@/components/Button";

interface ConfirmationButtonProps extends Omit<ButtonProps, "onPress"> {
  description?: string;
  onConfirm: () => void;
  title: string;
}

export type { ConfirmationButtonProps };

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  title: string;
  visible: boolean;
}

export type { ModalProps };

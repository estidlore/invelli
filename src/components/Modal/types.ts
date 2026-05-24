interface ModalProps extends ModalBaseProps {
  children: React.ReactNode;
  title: string;
}

interface ModalBaseProps {
  onClose?: () => void;
  visible: boolean;
}

export type { ModalBaseProps, ModalProps };

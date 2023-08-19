import type { ModalBaseProps } from "components/Modal/types";

interface BarcodeScannerProps extends ModalBaseProps {
  onScan: (barcode: string) => void;
}

interface ReadCodeEvent {
  nativeEvent: {
    codeStringValue: string;
  };
}

export type { BarcodeScannerProps, ReadCodeEvent };

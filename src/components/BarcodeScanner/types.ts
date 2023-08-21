interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

interface ReadCodeEvent {
  nativeEvent: {
    codeStringValue: string;
  };
}

export type { BarcodeScannerProps, ReadCodeEvent };

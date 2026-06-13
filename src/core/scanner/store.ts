import { create } from "zustand";

interface ScanState {
  scannedBarcode: string | null;
  setScannedBarcode: (barcode: string) => void;
}

const useScanStore = create<ScanState>((set) => ({
  scannedBarcode: null,
  setScannedBarcode: (barcode): void => {
    set({ scannedBarcode: barcode });
  },
}));

export { useScanStore };

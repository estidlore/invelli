import type { BarcodeSettings } from "expo-camera";

const barcodeSettings: BarcodeSettings = {
  barcodeTypes: [
    "ean13",
    "ean8",
    "upc_a",
    "upc_e",
    "itf14",
    "code39",
    "code93",
    "datamatrix",
    "codabar",
    "pdf417",
  ],
};

export { barcodeSettings };

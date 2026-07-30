import { useRouter } from "expo-router";
import React from "react";

import { Scanner } from "@/components";

import { useScanStore } from "./store";

const ScannerScreen = (): React.JSX.Element => {
  const router = useRouter();
  const setScannedBarcode = useScanStore((state) => state.setScannedBarcode);

  const handleScan = (code: string): void => {
    setScannedBarcode(code);
    router.back();
  };

  return <Scanner onScan={handleScan} />;
};

export { ScannerScreen };

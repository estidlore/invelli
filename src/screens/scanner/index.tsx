import { useRouter } from "expo-router";
import React from "react";

import { Button, Scanner } from "@/components";

import { useScanStore } from "./store";
import { styles } from "./styles";

const ScannerScreen = (): React.JSX.Element => {
  const router = useRouter();
  const setScannedBarcode = useScanStore((state) => state.setScannedBarcode);

  const handleBack = (): void => {
    router.back();
  };

  const handleScan = (code: string): void => {
    setScannedBarcode(code);
    router.back();
  };

  return (
    <Scanner onScan={handleScan}>
      <Button
        color={"background"}
        icon={"back"}
        onPress={handleBack}
        style={styles.backBtn}
        variant={"solid"}
      />
    </Scanner>
  );
};

export { ScannerScreen };

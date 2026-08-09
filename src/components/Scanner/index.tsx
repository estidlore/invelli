import type { BarcodeScanningResult } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import React, { useReducer, useRef } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { Text } from "@/components/Text";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { logError } from "@/utils";

import { barcodeSettings } from "./constants";
import { styles } from "./styles";
import { translations } from "./translations";
import type { ScannerProps } from "./types";

const Scanner = ({ children, onScan, style }: ScannerProps): React.JSX.Element => {
  const [permission, requestPermission] = useCameraPermissions();
  const [enableTorch, toggleTorch] = useReducer((val) => !val, false);
  const isScannedRef = useRef<boolean>(false);

  const t = useTranslation(translations);

  if (permission === null) {
    return <Spinner style={style} />;
  }

  const handleRequestPermission = (): void => {
    requestPermission().catch(logError);
  };

  if (!permission.granted) {
    return (
      <View style={[commonStyles.center, style]}>
        <Text style={styles.allowCameraText}>{t.cameraRequired}</Text>
        <Button color={"primary"} onPress={handleRequestPermission} variant={"solid"}>
          {t.allow}
        </Button>
      </View>
    );
  }

  const handleScan = (scanResult: BarcodeScanningResult): void => {
    if (isScannedRef.current) return;

    const barcode = scanResult.data;
    isScannedRef.current = true;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(logError);
    onScan(barcode);

    setTimeout(() => {
      isScannedRef.current = false;
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <CameraView
        autofocus={"on"}
        barcodeScannerSettings={barcodeSettings}
        enableTorch={enableTorch}
        onBarcodeScanned={handleScan}
        style={commonStyles.grow}
      />
      <Button
        color={"background"}
        icon={enableTorch ? "flashOn" : "flashOff"}
        onPress={toggleTorch}
        style={styles.torchToggle}
        variant={"solid"}
      />
      {children}
    </View>
  );
};

export { Scanner };

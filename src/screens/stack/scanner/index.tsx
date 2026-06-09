import type { BarcodeScanningResult } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Vibration, View } from "react-native";

import { Button, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { barcodeSettings, useScanStore } from "@/core/scanner";
import { useColors } from "@/core/theme";
import { logError } from "@/utils";

import { styles } from "./styles";
import { translations } from "./translations";

const ScannerScreen = (): React.JSX.Element => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { setScannedBarcode } = useScanStore();

  const t = useTranslation(translations);
  const colors = useColors();

  const handleRequestPermission = (): void => {
    requestPermission().catch(logError);
  };

  const handleScan = (scanResult: BarcodeScanningResult): void => {
    if (scanned) return;
    setScanned(true);
    Vibration.vibrate(100);
    setScannedBarcode(scanResult.data);
    router.back();
  };

  if (permission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.allowCameraText}>{t.cameraRequired}</Text>
        <Button onPress={handleRequestPermission}>{t.allow}</Button>
      </View>
    );
  }

  return (
    <View style={styles.cameraWrapper}>
      {!scanned && (
        <CameraView
          autofocus={"on"}
          barcodeScannerSettings={barcodeSettings}
          enableTorch={false}
          onBarcodeScanned={handleScan}
          style={styles.camera}
        />
      )}
    </View>
  );
};

export { ScannerScreen };

import React, { useCallback } from "react";
import { Modal, Vibration } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

import { Button } from "components/Button";

import { styles } from "./styles";
import type { BarcodeScannerProps, ReadCodeEvent } from "./types";

const BarcodeScanner = ({
  onClose,
  onScan,
  visible
}: BarcodeScannerProps): JSX.Element | null => {
  const handleReadCode = useCallback(
    (ev: ReadCodeEvent) => {
      const code = ev.nativeEvent.codeStringValue;
      onScan(code);
      Vibration.vibrate(100);
      onClose?.();
    },
    [onClose, onScan]
  );

  return (
    <Modal onRequestClose={onClose} visible={visible}>
      <Camera
        cameraType={CameraType.Back}
        flashMode={"auto"}
        frameColor={"white"}
        laserColor={"red"}
        onReadCode={handleReadCode}
        scanBarcode
        style={styles.camera}
        surfaceColor={"blue"}
      />
      <Button icon={"times"} onPress={onClose} style={styles.closeButton} />
    </Modal>
  );
};

export { BarcodeScanner };

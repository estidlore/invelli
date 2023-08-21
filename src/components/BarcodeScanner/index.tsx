import React, { useCallback, useReducer } from "react";
import { Modal, Vibration } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

import { Button } from "components/Button";

import { styles } from "./styles";
import type { BarcodeScannerProps, ReadCodeEvent } from "./types";

const BarcodeScanner = ({
  onScan
}: BarcodeScannerProps): JSX.Element | null => {
  const [scan, toggleScan] = useReducer((val) => !val, false);
  const handleReadCode = useCallback(
    (ev: ReadCodeEvent) => {
      const code = ev.nativeEvent.codeStringValue;
      onScan(code);
      Vibration.vibrate(100);
      toggleScan();
    },
    [onScan, toggleScan]
  );

  return (
    <>
      <Button icon={"qrcode"} onPress={toggleScan} />
      <Modal onRequestClose={toggleScan} visible={scan}>
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
        <Button
          icon={"times"}
          onPress={toggleScan}
          style={styles.closeButton}
        />
      </Modal>
    </>
  );
};

export { BarcodeScanner };

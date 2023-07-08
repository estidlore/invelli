import React, { useCallback } from "react";
import DocPicker from "react-native-document-picker";

import { Button } from "components/Button";

import type { FilePickerProps } from "./types";

const FilePicker = ({ children, onPick }: FilePickerProps): JSX.Element => {
  const handlePick = useCallback(() => {
    DocPicker.pick().then(onPick).catch(console.error);
  }, [onPick]);

  return (
    <Button icon={"file-import"} onPress={handlePick}>
      {children}
    </Button>
  );
};

export { FilePicker };

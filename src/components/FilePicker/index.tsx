import { useCallback } from "react";
import DocPicker from "react-native-document-picker";

import { Button } from "components/Button";
import { logError } from "utils";

import type { FilePickerProps } from "./types";

const FilePicker = ({
  children,
  onPick,
}: FilePickerProps): React.JSX.Element => {
  const handlePick = useCallback(() => {
    DocPicker.pickSingle().then(onPick).catch(logError);
  }, [onPick]);

  return (
    <Button icon={"file-import"} onPress={handlePick}>
      {children}
    </Button>
  );
};

export { FilePicker };

import type { ButtonProps } from "components/Button/types";
import type { File } from "utils/files/types";

interface FilePickerProps extends Pick<ButtonProps, "children"> {
  onPick?: (res: File) => void;
}

export type { FilePickerProps };

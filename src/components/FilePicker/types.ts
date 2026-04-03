import type { ButtonProps } from "components/Button/types";

interface File {
  uri: string;
}

interface FilePickerProps extends Pick<ButtonProps, "children"> {
  onPick?: (res: File) => void;
}

export type { FilePickerProps };

import type { DocumentPickerResponse } from "react-native-document-picker";

import type { ButtonProps } from "components/Button/types";

type File = Pick<DocumentPickerResponse, "name" | "uri">;

interface FilePickerProps extends Pick<ButtonProps, "children"> {
  onPick?: (res: File[]) => void;
}

export type { FilePickerProps, File };

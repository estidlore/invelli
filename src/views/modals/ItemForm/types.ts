import type { ModalBaseProps } from "components/Modal/types";
import type { Item } from "utils/types";

interface ItemFormProps extends ModalBaseProps {
  item?: Partial<Omit<Item, "id">>;
  onSave?: (data: Omit<Item, "id">) => void;
}

export type { ItemFormProps };

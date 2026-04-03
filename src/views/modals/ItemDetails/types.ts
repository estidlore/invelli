import type { ModalBaseProps } from "components/Modal/types";
import type { Item } from "utils";

interface ItemDetailsProps extends ModalBaseProps {
  item: Omit<Item, "id">;
}

export type { ItemDetailsProps };

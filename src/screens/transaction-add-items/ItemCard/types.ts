import type { Item } from "@/db";

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

export type { ItemCardProps };

import type { Item } from "utils/types";

const itemToKeywords = ({
  brand = "",
  code = "",
  name,
  unit = ""
}: Item): string[] => {
  return [code, name, brand, unit].join(" ").split(" ");
};

export { itemToKeywords };

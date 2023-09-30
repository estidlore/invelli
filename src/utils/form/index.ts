import { useState } from "react";

import type { FieldMap, FieldType } from "./types";

const initField = <T extends keyof FieldType>(
  type: T,
  val?: FieldType[T],
): FieldMap[T] => {
  switch (type) {
    case "boolean":
      return (val ?? false) as FieldMap[T];
    case "number":
      return (val?.toString() ?? "") as FieldMap[T];
    default:
      return (val ?? "") as FieldMap[T];
  }
};

const useField = <T extends keyof FieldType>(
  type: T,
  val?: FieldType[T],
): [FieldMap[T], (val: FieldMap[T]) => void] => {
  return useState<FieldMap[T]>(initField(type, val));
};

export { useField };

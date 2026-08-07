import type { ZodObject, ZodType } from "zod";

type ZodSchema<T> = ZodObject<Record<keyof T, ZodType>>;

interface UseFormOptions<T> {
  autoSaveMs?: number;
  onAutoSave?: (values: T) => Promise<void>;
  onSubmit: (values: T) => Promise<void>;
  schema: ZodSchema<T>;
  setValues: (values: T) => void;
  values: T;
}

interface FieldProps<V = string> {
  meta: {
    error?: string;
    touched: boolean;
  };
  onBlur: (overrideValue?: string) => void;
  onChange: (text: string) => void;
  value: V;
}

interface FormState {
  getFieldProps: <V>(field: string) => FieldProps<V>;
  isSubmitting: boolean;
  submit: () => Promise<void>;
}

export type { FieldProps, FormState, UseFormOptions, ZodSchema };

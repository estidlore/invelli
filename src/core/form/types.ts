import type { ZodObject, ZodType } from "zod";

type ZodSchema<T> = ZodObject<Record<keyof T, ZodType>>;

interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  schema: ZodSchema<T>;
}

interface FieldProps<V = string> {
  meta: {
    error?: string;
    touched: boolean;
  };
  onBlur: () => void;
  onChange: (text: string) => void;
  value: V;
}

interface FormState<T extends Record<string, unknown>> {
  getFieldProps: <V>(field: string) => FieldProps<V>;
  isSubmitting: boolean;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  submit: () => Promise<void>;
}

export type { FieldProps, FormState, UseFormOptions };

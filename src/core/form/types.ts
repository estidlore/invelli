import type { ZodObject, ZodType } from "zod";

interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  schema: ZodObject<Record<keyof T, ZodType>>;
}

interface FieldProps<T, K extends keyof T> {
  meta: {
    error?: string;
    touched: boolean;
  };
  onBlur: () => void;
  onChange: (text: string) => void;
  value: T[K];
}

interface FormState<T extends Record<string, unknown>> {
  getFieldProps: <K extends keyof T>(field: K) => FieldProps<T, K>;
  isSubmitting: boolean;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  submit: () => Promise<void>;
}

export type { FieldProps, FormState, UseFormOptions };

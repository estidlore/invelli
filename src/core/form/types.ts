import type { ZodSafeParseResult, ZodType, input, output } from "zod";

type ZodParseRes<S> = ZodSafeParseResult<output<S>>;

interface UseFormOptions<S extends ZodType<object, object>> {
  autoSaveMs?: number;
  onAutoSave?: (values: output<S>) => Promise<void>;
  onSubmit: (values: output<S>) => Promise<void>;
  schema: S;
  setValues: (values: input<S>) => void;
  values: input<S>;
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

export type { FieldProps, FormState, UseFormOptions, ZodParseRes };

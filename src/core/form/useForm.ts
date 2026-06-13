import { get, omit, template } from "litus";
import { useState } from "react";
import type { z } from "zod";

import { useTranslation } from "@/core/language";
import type { Translation } from "@/core/language";

import { translations } from "./translations";
import type { FieldProps, FormState, UseFormOptions } from "./types";

const getErrorTranslation = (t: Translation, issue: z.core.$ZodIssue): string => {
  const text = get(t, issue.message, issue.message);
  return template(text, issue);
};

// eslint-disable-next-line max-lines-per-function
const useForm = <T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  schema,
}: UseFormOptions<T>): FormState<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const t = useTranslation(translations);

  const validateField = (field: keyof T, value: unknown): void => {
    const fieldSchema = schema.shape[field];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setErrors((prev) => omit(prev, [field]) as Partial<Record<keyof T, string>>);
    } else {
      const errMsg = getErrorTranslation(t, result.error.issues[0]);
      setErrors((prev) => ({ ...prev, [field]: errMsg }));
    }
  };

  const submit = async (): Promise<void> => {
    setIsSubmitting(true);
    const result = schema.safeParse(values);

    if (!result.success) {
      const newErrors: Partial<Record<keyof T, string>> = {};
      const newTouched: Partial<Record<keyof T, boolean>> = {};

      result.error.issues.forEach((err): void => {
        const path = err.path[0] as keyof T;
        if (!newErrors[path]) {
          newErrors[path] = getErrorTranslation(t, err);
        }
        newTouched[path] = true;
      });

      setErrors(newErrors);
      setTouched(newTouched);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldProps = <K extends keyof T>(field: K): FieldProps<T, K> => ({
    meta: {
      error: errors[field],
      touched: !!touched[field],
    },
    onBlur: (): void => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, values[field]);
    },
    onChange: (value: string): void => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        validateField(field, value);
      }
    },
    value: values[field],
  });

  return { getFieldProps, isSubmitting, setValues, submit };
};

export { useForm };

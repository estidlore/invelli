import { copy, get, keys, set, size, template } from "litus";
import { useState } from "react";
import type { z } from "zod";

import type { Translation } from "@/core/language";
import { useTranslation } from "@/core/language";

import { translations } from "./translations";
import type { FieldProps, FormState, UseFormOptions } from "./types";

const getErrorTranslation = (t: Translation, issue: z.core.$ZodIssue): string => {
  const text = get(t, issue.message, issue.message);
  return template(text, issue);
};

// eslint-disable-next-line max-lines-per-function
const useForm = <T extends Record<string, unknown>>({
  onSubmit,
  schema,
  setValues,
  values,
}: UseFormOptions<T>): FormState => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const t = useTranslation(translations);

  const validateForm = (data: T = values): Record<string, string> => {
    const result = schema.safeParse(data);
    const newErrors: Record<string, string> = {};

    if (!result.success) {
      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (!newErrors[path]) {
          newErrors[path] = getErrorTranslation(t, err);
        }
      });
    }

    setErrors(newErrors);
    return newErrors;
  };

  const submit = async (): Promise<void> => {
    setIsSubmitting(true);
    const newErrors = validateForm();

    if (size(newErrors) > 0) {
      const allTouched = keys(newErrors).reduce<Record<string, boolean>>((acc, path) => {
        acc[path] = true;
        return acc;
      }, {});

      setTouched(allTouched);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldProps = <V = string>(field: string): FieldProps<V> => ({
    meta: {
      error: errors[field],
      touched: !!touched[field],
    },
    onBlur: (): void => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateForm();
    },
    onChange: (value: string): void => {
      const newValues = set(copy(values), field, value);
      setValues(newValues);
      validateForm(newValues);
    },
    value: get(values, field),
  });

  return { getFieldProps, isSubmitting, submit };
};

export { useForm };

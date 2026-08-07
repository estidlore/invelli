import { useNavigation } from "expo-router";
import { copy, get, keys, set, size, template } from "litus";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { z } from "zod";

import type { Translation } from "@/core/language";
import { useTranslation } from "@/core/language";
import { logError } from "@/utils";

import { translations } from "./translations";
import type { FieldProps, FormState, UseFormOptions } from "./types";

const getErrorTranslation = (t: Translation, issue: z.core.$ZodIssue): string => {
  const text = get(t, issue.message, issue.message);
  return template(text, issue);
};

// eslint-disable-next-line max-lines-per-function
const useForm = <T extends Record<string, unknown>>({
  autoSaveMs = 1000,
  onAutoSave,
  onSubmit,
  schema,
  setValues,
  values,
}: UseFormOptions<T>): FormState => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const t = useTranslation(translations);

  const autoSave = (data: T): void => {
    const newErrors = validateForm(data);
    if (size(newErrors) > 0) {
      return;
    }
    onAutoSave?.(data).catch((err) => {
      logError(`Autosave failed: ${err}`);
    });
  };
  const debouncedAutoSave = useDebouncedCallback(autoSave, autoSaveMs);

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      debouncedAutoSave.flush();
    });
    return unsubscribe;
  }, [navigation]);

  const validateForm = (data: T): Record<string, string> => {
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
    debouncedAutoSave.cancel();
    const newErrors = validateForm(values);

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
    onBlur: (overrideValue?: string): void => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      let newValues = values;
      if (overrideValue !== undefined) {
        newValues = set(copy(values), field, overrideValue);
      }

      const newErrors = validateForm(newValues);
      if (onAutoSave && size(newErrors) === 0) {
        debouncedAutoSave.cancel();
        autoSave(newValues);
      }
    },
    onChange: (value: string): void => {
      const newValues = set(copy(values), field, value);
      setValues(newValues);
      if (errors[field]) {
        validateForm(newValues);
      }
      if (onAutoSave) {
        debouncedAutoSave(newValues);
      }
    },
    value: get(values, field),
  });

  return { getFieldProps, isSubmitting, submit };
};

export { useForm };

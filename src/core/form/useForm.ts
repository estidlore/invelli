import { useNavigation } from "expo-router";
import { copy, get, keys, set, template } from "litus";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { ZodType, z } from "zod";

import type { Translation } from "@/core/language";
import { useTranslation } from "@/core/language";
import { logError } from "@/utils";

import { translations } from "./translations";
import type { FieldProps, FormState, UseFormOptions, ZodParseRes } from "./types";

const getErrorTranslation = (t: Translation, issue: z.core.$ZodIssue): string => {
  const text = get(t, issue.message, issue.message);
  return template(text, issue);
};

// eslint-disable-next-line max-lines-per-function
const useForm = <S extends ZodType<object, object>>({
  autoSaveMs = 1000,
  onAutoSave,
  onSubmit,
  schema,
  setValues,
  values,
}: UseFormOptions<S>): FormState => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const t = useTranslation(translations);

  const autoSave = (parseRes: ZodParseRes<S>): void => {
    validateForm(parseRes);
    if (!parseRes.success) {
      return;
    }
    onAutoSave?.(parseRes.data).catch((err) => {
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
  }, [debouncedAutoSave, navigation]);

  const validateForm = (parseRes: ZodParseRes<S>): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!parseRes.success) {
      parseRes.error.issues.forEach((err) => {
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
    const parseRes = schema.safeParse(values);
    const newErrors = validateForm(parseRes);

    if (!parseRes.success) {
      const allTouched = keys(newErrors).reduce<Record<string, boolean>>((acc, path) => {
        acc[path] = true;
        return acc;
      }, {});

      setTouched(allTouched);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(parseRes.data);
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

      const parseRes = schema.safeParse(newValues);
      if (onAutoSave) {
        debouncedAutoSave.cancel();
        autoSave(parseRes);
      } else {
        validateForm(parseRes);
      }
    },
    onChange: (value: string): void => {
      const newValues = set(copy(values), field, value);
      setValues(newValues);
      const parseRes = schema.safeParse(newValues);
      if (errors[field]) {
        validateForm(parseRes);
      }
      if (onAutoSave) {
        debouncedAutoSave(parseRes);
      }
    },
    value: get(values, field),
  });

  return { getFieldProps, isSubmitting, submit };
};

export { useForm };

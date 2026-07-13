import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    arrMax: "Cannot exceed {{maximum}} elements",
    arrMin: "Must have at least {{minimum}} elements",
    int: "Must be an integer number",
    max: "Cannot exceed {{maximum}} characters",
    min: "Must be at least {{minimum}} characters",
    nonnegative: "Must be a non-negative number",
    number: "Must be a valid number",
    positive: "Must be a positive number",
    required: "Required",
    snakeOrKebab: "Only letters, numbers or dashes",
  },
  SPA: {
    arrMax: "No puede superar los {{maximum}} elementos",
    arrMin: "Debe tener al menos {{minimum}} elementos",
    int: "Debe ser un número entero",
    max: "No puede superar los {{maximum}} caracteres",
    min: "Debe tener al menos {{minimum}} caracteres",
    nonnegative: "Debe ser un número mayor o igual a cero",
    number: "Debe ser un número válido",
    positive: "Debe ser un número positivo",
    required: "Requerido",
    snakeOrKebab: "Solo letras, números o guiones",
  },
});

export { translations };

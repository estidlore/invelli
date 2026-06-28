import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    int: "Must be an integer number",
    max: "Cannot exceed {{maximum}} characters",
    min: "Must be at least {{minimum}} characters",
    nonnegative: "Must be a non-negative number",
    number: "Must be a valid number",
    positive: "Must be a positive number",
    snakeOrKebab: "Only letters, numbers or dashes",
  },
  SPA: {
    int: "Debe ser un número entero",
    max: "No pueden superar los {{maximum}} caracteres",
    min: "Debe tener al menos {{minimum}} caracteres",
    nonnegative: "Debe ser un número mayor o igual a cero",
    number: "Debe ser un número válido",
    positive: "Debe ser un número positivo",
    snakeOrKebab: "Solo letras, números o guiones",
  },
});

export { translations };

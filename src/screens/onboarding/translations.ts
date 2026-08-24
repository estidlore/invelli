import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    businessName: "Business name",
    start: "Start",
    welcome: "Welcome!",
  },
  SPA: {
    businessName: "Nombre del negocio",
    start: "Comenzar",
    welcome: "Bienvenido",
  },
});

export { translations };

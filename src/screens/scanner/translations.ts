import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    allow: "Allow",
    cameraRequired: "We need your permission to use the camera",
  },
  SPA: {
    allow: "Permitir",
    cameraRequired: "Necesitamos tu permiso para usar la cámara",
  },
});

export { translations };

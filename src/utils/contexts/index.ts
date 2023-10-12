import { createLanguageContext } from "ruxi";

const Language = createLanguageContext({
  languages: {
    ENG: {
      name: "English",
    },
    SPA: {
      name: "Español",
    },
  },
  main: "ENG",
});

export { Language };

import { createLanguageContext } from "ruxi";

const languages = {
  ENG: {
    name: "English",
  },
  SPA: {
    name: "Español",
  },
};

const Language = createLanguageContext({
  languages,
  main: "ENG",
});

export { Language, languages };

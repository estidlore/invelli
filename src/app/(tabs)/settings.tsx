import { StyleSheet, View } from "react-native";

import { Select, Text } from "@/components";
import { languages, useLanguageStore, useTranslation } from "@/core/language";
import type { ThemePreference } from "@/core/theme";
import { useThemeStore } from "@/core/theme";

const translations = {
  ENG: {
    darkMode: {
      dark: "Enabled",
      light: "Disabled",
      system: "Use system settings",
      title: "Dark mode",
    },
    language: "Language",
    settings: "Settings",
  },
  SPA: {
    darkMode: {
      dark: "Activado",
      light: "Desactivado",
      system: "Usar configuración del sistema",
      title: "Modo oscuro",
    },
    language: "Lenguaje",
    settings: "Configuraciones",
  },
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 24,
  },
});

const languageOptions = languages.map((language) => ({
  text: language.label,
  value: language.id,
}));

const themePreferences: ThemePreference[] = ["dark", "light", "system"];

const Settings = (): React.JSX.Element => {
  const t = useTranslation(translations);

  const { languagePreference, setLanguagePreference } = useLanguageStore();
  const { themePreference, setThemePreference } = useThemeStore();

  const darkModeOptions = themePreferences.map((el) => ({
    text: t.darkMode[el],
    value: el,
  }));

  return (
    <View>
      <Text style={styles.title} type={"title"}>
        {t.settings}
      </Text>
      <Select
        label={t.darkMode.title}
        onChange={setThemePreference}
        options={darkModeOptions}
        style={styles.button}
        value={themePreference}
      />
      <Select
        label={t.language}
        onChange={setLanguagePreference}
        options={languageOptions}
        style={styles.button}
        value={languagePreference}
      />
    </View>
  );
};

export default Settings;

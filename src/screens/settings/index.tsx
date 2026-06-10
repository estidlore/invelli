import { View } from "react-native";

import { Button, Select, Text } from "@/components";
import { languages, useLanguageStore, useTranslation } from "@/core/language";
import type { ThemePreference } from "@/core/theme";
import { useThemeStore } from "@/core/theme";
import { exportToJson, importFromJson } from "@/db";
import { logError } from "@/utils";

import { styles } from "./styles";
import { translations } from "./translations";

const languageOptions = languages.map((language) => ({
  text: language.label,
  value: language.id,
}));

const themePreferences: ThemePreference[] = ["dark", "light", "system"];

const SettingsScreen = (): React.JSX.Element => {
  const t = useTranslation(translations);

  const { languagePreference, setLanguagePreference } = useLanguageStore();
  const { themePreference, setThemePreference } = useThemeStore();

  const darkModeOptions = themePreferences.map((el) => ({
    text: t.darkMode[el],
    value: el,
  }));

  const handleExport = (): void => {
    exportToJson().catch(logError);
  };

  const handleImport = (): void => {
    importFromJson().catch(logError);
  };

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
      <Button onPress={handleExport} style={styles.button}>
        {t.exportData}
      </Button>
      <Button onPress={handleImport} style={styles.button}>
        {t.importData}
      </Button>
    </View>
  );
};

export { SettingsScreen };

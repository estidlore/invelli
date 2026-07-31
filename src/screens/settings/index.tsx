import { View } from "react-native";

import { Button, Select, Text, useToastStore } from "@/components";
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
  const showToast = useToastStore((state) => state.showToast);

  const { languagePreference, setLanguagePreference } = useLanguageStore();
  const { themePreference, setThemePreference } = useThemeStore();

  const darkModeOptions = themePreferences.map((el) => ({
    text: t.darkMode[el],
    value: el,
  }));

  const handleExport = (): void => {
    exportToJson()
      .then(() => {
        showToast(t.toast.dataExported);
      })
      .catch((err) => {
        logError(err);
        showToast(t.toast.dataExportError, "error");
      });
  };

  const handleImport = (): void => {
    importFromJson()
      .then(() => {
        showToast(t.toast.dataImported);
      })
      .catch((err) => {
        logError(err);
        showToast(t.toast.dataImportError, "error");
      });
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
      <Button onPress={handleExport} style={styles.button} variant={"outline"}>
        {t.exportData}
      </Button>
      <Button onPress={handleImport} style={styles.button} variant={"outline"}>
        {t.importData}
      </Button>
    </View>
  );
};

export { SettingsScreen };

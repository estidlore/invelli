import { SegmentedControl, Text } from "@/components";
import { languages, useLanguageStore, useTranslation } from "@/core/language";
import { useThemeStore } from "@/core/theme";

import { styles } from "./styles";
import { translations } from "./translations";

const languageOptions = languages.map((language) => ({
  text: language.label,
  value: language.id,
}));

const PreferencesSettings = (): React.JSX.Element => {
  const t = useTranslation(translations);

  const languagePreference = useLanguageStore((state) => state.languagePreference);
  const setLanguagePreference = useLanguageStore((state) => state.setLanguagePreference);
  const themePreference = useThemeStore((state) => state.themePreference);
  const setThemePreference = useThemeStore((state) => state.setThemePreference);

  return (
    <>
      <Text style={styles.title} type={"subtitle"}>
        {t.title}
      </Text>

      <SegmentedControl
        label={t.mode.title}
        onChange={setThemePreference}
        options={[
          { icon: "moon", text: t.mode.dark, value: "dark" },
          { icon: "sun", text: t.mode.light, value: "light" },
          { icon: "circleHalf", text: t.mode.system, value: "system" },
        ]}
        value={themePreference}
      />
      <SegmentedControl
        label={t.language}
        onChange={setLanguagePreference}
        options={languageOptions}
        value={languagePreference}
      />
    </>
  );
};

export { PreferencesSettings };

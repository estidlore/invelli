import AsyncStorage from "@react-native-async-storage/async-storage";
import { entries } from "litus";
import { useCallback, useMemo } from "react";
import { View } from "react-native";

import { Button, Select } from "components";
import {
  Language,
  languages,
  logError,
  shareBackup,
  useCollection,
} from "utils";

import { useTranslation } from "./language";
import { styles } from "./styles";

const SettingsScreen = (): React.JSX.Element => {
  const t = useTranslation();
  const lang = Language.useLanguage();
  const items = useCollection("Item");

  const languageOptions = useMemo(
    () =>
      entries(languages).map(([key, val]) => ({
        text: val.name,
        value: key,
      })),
    [],
  );

  const handleShare = useCallback(() => {
    shareBackup({ items });
  }, [items]);

  const handleChangeLanguage = useCallback(
    (value: "ENG" | "SPA"): void => {
      AsyncStorage.setItem("language", value)
        .then(() => {
          lang.setLanguage(value);
        })
        .catch(logError);
    },
    [lang],
  );

  return (
    <View>
      <Button onPress={handleShare} style={styles.button}>
        {t.shareData}
      </Button>
      <Select
        label={t.language}
        onChange={handleChangeLanguage}
        options={languageOptions}
        style={styles.button}
        value={lang.language.code}
      />
    </View>
  );
};

export { SettingsScreen };

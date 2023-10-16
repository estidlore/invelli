import AsyncStorage from "@react-native-async-storage/async-storage";
import { obj } from "litus";
import React, { useCallback, useMemo } from "react";
import { View } from "react-native";

import { Button, Select } from "components";
import { Language, languages } from "utils/contexts";
import { useCollection } from "utils/db";
import { shareBackup } from "utils/share";

import { useTranslation } from "./language";
import { styles } from "./styles";

const SettingsScreen = (): JSX.Element => {
  const t = useTranslation();
  const lang = Language.useLanguage();
  const items = useCollection("Item");

  const languageOptions = useMemo(
    () =>
      obj.entries(languages).map(([key, val]) => ({
        text: val.name,
        value: key,
      })),
    [],
  );

  const handleShare = useCallback(() => {
    shareBackup({
      items,
    }).catch(console.error);
  }, [items]);

  const handleChangeLanguage = useCallback(
    (value: "ENG" | "SPA"): void => {
      AsyncStorage.setItem("language", value)
        .then(() => {
          lang.setLanguage(value);
        })
        .catch(console.error);
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

import { ScrollView } from "react-native";

import { Screen } from "@/components";
import { useTranslation } from "@/core/language";

import { BusinessSettings } from "./Business";
import { DataSettings } from "./Data";
import { PreferencesSettings } from "./Preferences";
import { styles } from "./styles";
import { translations } from "./translations";

const SettingsScreen = (): React.JSX.Element => {
  const t = useTranslation(translations);

  return (
    <Screen title={t.title}>
      <ScrollView contentContainerStyle={styles.column}>
        <BusinessSettings />
        <PreferencesSettings />
        <DataSettings />
      </ScrollView>
    </Screen>
  );
};

export { SettingsScreen };

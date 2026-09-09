import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

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
      <KeyboardAwareScrollView
        bottomOffset={16}
        contentContainerStyle={styles.column}
        keyboardShouldPersistTaps={"handled"}
      >
        <BusinessSettings />
        <PreferencesSettings />
        <DataSettings />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export { SettingsScreen };

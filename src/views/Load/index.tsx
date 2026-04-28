import AsyncStorage from "@react-native-async-storage/async-storage";
import { identity, vals } from "litus";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useUpdate } from "ruxi";

import { Text } from "components";
import { TabNav } from "navigation/TabNav";
import { colors, Language, logError } from "utils";

import { styles } from "./styles";

const LoadScreen = (): React.JSX.Element => {
  const [load, updateLoad] = useUpdate({ language: false });
  const { setLanguage } = Language.useLanguage();

  useEffect(() => {
    AsyncStorage.getItem("language")
      .then((language) => {
        if (language === null) {
          AsyncStorage.setItem("language", "ENG").catch(logError);
        } else {
          setLanguage(language as "ENG" | "SPA");
        }
        updateLoad({ language: true });
      })
      .catch(logError);
  }, [setLanguage, updateLoad]);

  if (vals(load).every(identity)) {
    return <TabNav />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"Invelli"}</Text>
      <ActivityIndicator color={colors.light} size={"large"} />
    </View>
  );
};

export { LoadScreen };

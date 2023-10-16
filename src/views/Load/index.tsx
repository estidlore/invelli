import AsyncStorage from "@react-native-async-storage/async-storage";
import { obj } from "litus";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useUpdate } from "ruxi";

import { Text } from "components";
import { TabNav } from "navigation/TabNav";
import { colors } from "utils/colors";
import { Language } from "utils/contexts";

import { styles } from "./styles";

const LoadScreen = (): JSX.Element => {
  const [load, updateLoad] = useUpdate({ language: false });
  const lang = Language.useLanguage();

  useEffect(() => {
    AsyncStorage.getItem("language")
      .then((language) => {
        if (language === null) {
          AsyncStorage.setItem("language", "ENG").catch(console.error);
        } else {
          lang.setLanguage(language as "ENG" | "SPA");
        }
        updateLoad({ language: true });
      })
      .catch(console.error);
  }, []);

  if (obj.vals(load).every((el) => el)) {
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

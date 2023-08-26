import React, { useCallback } from "react";
import { View } from "react-native";

import { Button } from "components";
import { useCollection } from "utils/db";
import { shareBackup } from "utils/files";

import { styles } from "./styles";

const SettingsScreen = (): JSX.Element => {
  const items = useCollection("Item");

  const handleShare = useCallback(() => {
    shareBackup({
      items
    }).catch(console.error);
  }, [items]);

  return (
    <View>
      <Button onPress={handleShare} style={styles.button}>
        {"Compartir datos"}
      </Button>
    </View>
  );
};

export { SettingsScreen };

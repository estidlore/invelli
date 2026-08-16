import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { commonStyles } from "@/core/theme";

import type { ScreenProps } from "./types";

const Screen = ({ actions, children, goBack = false, title }: ScreenProps): React.JSX.Element => {
  const router = useRouter();

  const handleBack = (): void => {
    router.back();
  };

  return (
    <>
      <View style={commonStyles.header}>
        {goBack && (
          <Button icon={"back"} onPress={typeof goBack === "function" ? goBack : handleBack} />
        )}
        {title && (
          <Text style={commonStyles.grow} type={"title"}>
            {title}
          </Text>
        )}
        {actions}
      </View>
      {children}
    </>
  );
};

export { Screen };

import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";

import { Button, Input, Screen, Text } from "@/components";
import { useForm } from "@/core/form";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { logError } from "@/utils";

import { useBusinessStore } from "../settings/Business";
import { schema } from "./schema";
import { styles } from "./styles";
import { translations } from "./translations";

const OnboardingScreen = (): React.JSX.Element => {
  const [values, setValues] = useState({
    businessName: "",
  });
  const setBusinessInfo = useBusinessStore((state) => state.setBusinessInfo);
  const t = useTranslation(translations);

  const { getFieldProps, isSubmitting, submit } = useForm({
    onSubmit: async (values) => {
      setBusinessInfo({ name: values.businessName });
    },
    schema,
    setValues,
    values,
  });

  const handleSubmit = (): void => {
    submit().catch(logError);
  };

  return (
    <Screen title={"Invelli"}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            contentFit={"contain"}
            source={require("@/assets/images/splash-icon.png")}
            style={styles.img}
          />
          <Text style={commonStyles.textCenter} type={"subtitle"}>
            {t.welcome}
          </Text>
        </View>
        <Input label={t.businessName} {...getFieldProps("businessName")} />
        <Button color={"primary"} disabled={isSubmitting} onPress={handleSubmit} variant={"solid"}>
          {t.start}
        </Button>
      </View>
    </Screen>
  );
};

export { OnboardingScreen };

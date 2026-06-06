import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Button, Input, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import { translations } from "./translations";

const ItemFormScreen = (): React.JSX.Element => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!params.id;

  const colors = useColors();
  const t = useTranslation(translations);

  const handleBack = (): void => {
    router.back();
  };

  return (
    <>
      <View style={styles.header}>
        <Text type={"title"}>{isEditMode ? t.editItem : t.addItem}</Text>
        <Button icon={"xmark"} onPress={handleBack} />
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoiding}
        >
          <Input label={t.label.sku} placeholder={t.placeholder.sku} style={styles.input} />
          <Input label={t.label.name} placeholder={t.placeholder.name} style={styles.input} />
          <Input label={t.label.quantity} placeholder={"5"} style={styles.input} type={"numeric"} />
          <Input
            label={t.label.costPrice}
            placeholder={"10.00"}
            style={styles.input}
            type={"numeric"}
          />
          <Input
            label={t.label.sellPrice}
            placeholder={"10.00"}
            style={styles.input}
            type={"numeric"}
          />
        </KeyboardAvoidingView>

        <View style={styles.actions}>
          <Button icon={"check"} style={[styles.save, { backgroundColor: colors.primary }]}>
            {t.save}
          </Button>
          {isEditMode && <Button icon={"trash"} />}
        </View>
      </ScrollView>
    </>
  );
};

export { ItemFormScreen };

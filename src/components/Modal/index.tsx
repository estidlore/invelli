import { Modal as NModal, ScrollView, View } from "react-native";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { ModalProps } from "./types";

const Modal = ({ children, onClose, title, visible }: ModalProps): React.JSX.Element => {
  const colors = useColors();

  return (
    <NModal animationType={"fade"} onRequestClose={onClose} transparent visible={visible}>
      <View style={[styles.modal, { backgroundColor: `${colors.background}88` }]}>
        <View style={[styles.container, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={styles.title} type={"title"}>
              {title}
            </Text>
            {onClose === undefined ? null : <Button icon={"xmark"} onPress={onClose} />}
          </View>
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </NModal>
  );
};

export { Modal };

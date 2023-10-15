import React from "react";
import { Modal as NModal, ScrollView, View } from "react-native";

import { Button } from "components/Button";
import { Text } from "components/Text";

import { styles } from "./styles";
import type { ModalProps } from "./types";

const Modal = ({
  children,
  onClose,
  title,
  visible,
}: ModalProps): JSX.Element => {
  return (
    <NModal
      animationType={"fade"}
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {onClose === undefined ? null : (
              <Button icon={"times"} onPress={onClose} />
            )}
          </View>
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </NModal>
  );
};

export { Modal };

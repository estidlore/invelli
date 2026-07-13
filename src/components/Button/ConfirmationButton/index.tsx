import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";

import { translations } from "./translations";
import type { ConfirmationButtonProps } from "./types";

const ConfirmationButton = ({
  children,
  description,
  onConfirm,
  title,
  ...rest
}: ConfirmationButtonProps): React.JSX.Element => {
  const [show, setShow] = useState(false);
  const t = useTranslation(translations);

  const handleCancel = (): void => {
    setShow(false);
  };

  const handleConfirm = (): void => {
    onConfirm();
    setShow(false);
  };

  const handleShow = (): void => {
    setShow(true);
  };

  return (
    <>
      <Button {...rest} onPress={handleShow}>
        {children}
      </Button>
      <Modal title={title} visible={show}>
        {description && <Text>{description}</Text>}
        <View style={commonStyles.row}>
          <Button onPress={handleCancel} style={commonStyles.grow}>
            {t.cancel}
          </Button>
          <Button
            color={"bgError"}
            onPress={handleConfirm}
            style={commonStyles.grow}
            variant={"solid"}
          >
            {t.confirm}
          </Button>
        </View>
      </Modal>
    </>
  );
};

export { ConfirmationButton };

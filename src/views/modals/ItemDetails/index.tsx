import { useCallback, useReducer } from "react";
import { View } from "react-native";

import { Button, Icon, Modal, Text } from "components";
import { useRealm } from "utils/db";
import type { Item } from "utils/types";
import { ItemForm } from "views/modals/ItemForm";

import { useTranslation } from "./language";
import { styles } from "./styles";
import type { ItemDetailsProps } from "./types";

const ItemDetails = ({
  item,
  onClose,
  visible,
}: ItemDetailsProps): JSX.Element => {
  const [showEdit, toggleEdit] = useReducer((val) => !val, false);
  const db = useRealm();
  const t = useTranslation();

  const handleEdit = useCallback(
    (data: Omit<Item, "id">) => {
      db.write(() => {
        Object.keys(data).forEach((el) => {
          const key = el as keyof Omit<Item, "id">;
          if (item[key] !== data[key]) {
            Object.assign(item, { [key]: data[key] });
          }
        });
      });
    },
    [db],
  );

  return (
    <>
      <Modal onClose={onClose} title={item.name} visible={visible}>
        <View style={styles.row}>
          <Icon name={"key"} style={styles.icon} />
          <Text style={styles.key}>{t.code}</Text>
          <Text>{item.code}</Text>
        </View>
        <View style={styles.row}>
          <Icon name={"tag"} style={styles.icon} />
          <Text style={styles.key}>{t.brand}</Text>
          <Text>{item.brand}</Text>
        </View>
        <View style={styles.row}>
          <Icon name={"ruler"} style={styles.icon} />
          <Text style={styles.key}>{t.unit}</Text>
          <Text>{item.unit}</Text>
        </View>
        <View style={styles.row}>
          <Icon name={"dollar-sign"} style={styles.icon} />
          <Text style={styles.key}>{t.cost}</Text>
          <Text>{item.cost}</Text>
        </View>
        <View style={styles.row}>
          <Icon name={"dollar-sign"} style={styles.icon} />
          <Text style={styles.key}>{t.price}</Text>
          <Text>{item.price}</Text>
        </View>
        <View style={styles.row}>
          <Icon name={"hashtag"} style={styles.icon} />
          <Text style={styles.key}>{t.quantity}</Text>
          <Text>{item.quantity}</Text>
        </View>
        <View style={[styles.row, styles.buttons]}>
          <Button icon={"pen"} onPress={toggleEdit}>
            {t.edit}
          </Button>
        </View>
      </Modal>
      <ItemForm
        item={item}
        onClose={toggleEdit}
        onSave={handleEdit}
        visible={showEdit}
      />
    </>
  );
};

export { ItemDetails };

import { Button, Text, useToast } from "@/components";
import { useTranslation } from "@/core/language";
import { exportToJson, importFromJson } from "@/db";
import { logError } from "@/utils";

import { styles } from "./styles";
import { translations } from "./translations";

const DataSettings = (): React.JSX.Element => {
  const t = useTranslation(translations);
  const showToast = useToast();

  const handleExport = (): void => {
    exportToJson()
      .then(() => {
        showToast(t.exported);
      })
      .catch((err) => {
        logError(err);
        showToast(t.exportError, "error");
      });
  };

  const handleImport = (): void => {
    importFromJson()
      .then(() => {
        showToast(t.imported);
      })
      .catch((err) => {
        logError(err);
        showToast(t.importError, "error");
      });
  };

  return (
    <>
      <Text style={styles.title} type={"subtitle"}>
        {t.title}
      </Text>
      <Button onPress={handleExport} variant={"outline"}>
        {t.export}
      </Button>
      <Button onPress={handleImport} variant={"outline"}>
        {t.import}
      </Button>
    </>
  );
};

export { DataSettings };

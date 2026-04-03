import { Buffer } from "buffer";
import { useCallback, useEffect } from "react";
import FS from "react-native-fs";
import Share from "react-native-share";
import type { ShareOpenResult } from "react-native-share/lib/typescript/src/types";
import type { ShareData } from "react-native-share-menu";
import ShareMenu from "react-native-share-menu";

import type { BackUp } from "utils";
import { loadBackup, logError, useRealm } from "utils";

const ShareConsumer = (): null => {
  const db = useRealm();

  const handleShare = useCallback(
    (share?: ShareData) => {
      if (share === undefined || share === null) {
        return;
      }
      if (typeof share.data === "string") {
        const uri = share.data;
        FS.readFile(uri)
          .then((data) => {
            const backup = JSON.parse(data);
            loadBackup(db, backup);
          })
          .catch(logError);
      }
    },
    [db],
  );

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return null;
};

const getBackupName = (): string => {
  return `Invelli${Math.floor(Date.now() / 6e4)}`;
};

const shareBackup = async (data: BackUp): Promise<ShareOpenResult> => {
  const json = JSON.stringify(data);
  const base64 = Buffer.from(json, "utf-8").toString("base64");
  return Share.open({
    filename: getBackupName(),
    type: "application/json",
    url: `data:application/json;base64,${base64}`,
  });
};

export { shareBackup, ShareConsumer };

import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { any, has, isObj, vals } from "litus";

import { backupMigration } from "./migration";
import { insertBackup } from "./queries";
import type { UnknownBackup } from "./types";

const parseJsonBackup = (json: string): UnknownBackup => {
  const backup = JSON.parse(json);
  if (!isObj(backup) || !has(backup, "metadata", "payload")) {
    throw new Error("Backup missing metadata or payload");
  }
  const { metadata, payload } = backup;
  if (!isObj(metadata) || !has(metadata, "exportedAt", "version")) {
    throw new Error("Backup metadata missing exportedAt or version");
  }
  if (!isObj(payload) || !has(payload, "items")) {
    throw new Error("Backup payload missing items table");
  }
  if (any(vals(payload), (table) => !Array.isArray(table))) {
    throw new Error("Backup payload tables must be arrays");
  }
  return backup as UnknownBackup;
};

const importFromJson = async (): Promise<void> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/json", "text/plain"],
  });
  if (result.canceled || !result.assets) {
    return;
  }

  const file = new File(result.assets[0].uri);
  const content = await file.text();
  const jsonBackup = parseJsonBackup(content);
  const backup = backupMigration(jsonBackup);
  await insertBackup(backup.payload);
};

export { importFromJson };

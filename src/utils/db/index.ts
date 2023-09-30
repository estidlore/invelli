import { createRealmContext } from "@realm/react";
import Realm from "realm";

import { schemas } from "./schemas";
import type { BackUp, CollectionName, Collections } from "./types";

const { RealmProvider, useQuery, useRealm } = createRealmContext({
  schema: schemas,
});

const useCollection = <T extends CollectionName>(
  collection: T,
): Collections[T][] => {
  return useQuery<Collections[T]>(collection).slice();
};

const loadBackup = (db: Realm, backup: BackUp): void => {
  db.write(() => {
    db.deleteAll();
    backup.items.forEach((item) => {
      const doc = Object.assign({}, item, {
        id: new Realm.BSON.UUID(item.id),
      });
      db.create("Item", doc);
    });
  });
};

export { loadBackup, RealmProvider, useCollection, useRealm };

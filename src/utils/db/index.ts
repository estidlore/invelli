import { createRealmContext } from "@realm/react";

import { schemas } from "./schemas";
import type { CollectionName, Collections } from "./types";

const { RealmProvider, useQuery, useRealm } = createRealmContext({
  schema: schemas
});

const useCollection = <T extends CollectionName>(
  collection: T
): Collections[T][] => {
  return useQuery<Collections[T]>(collection).slice();
};

export { RealmProvider, useCollection, useRealm };

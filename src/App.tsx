import "react-native-get-random-values";

import React from "react";
import Realm from "realm";

import { Screen } from "components";
import { TabNav } from "navigation/TabNav";
import { RealmProvider } from "utils/db";

Realm.flags.THROW_ON_GLOBAL_REALM = true;

const App = (): JSX.Element => {
  return (
    <RealmProvider>
      <Screen>
        <TabNav />
      </Screen>
    </RealmProvider>
  );
};

export { App };

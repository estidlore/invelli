import "react-native-get-random-values";

import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import Realm from "realm";

import { Screen } from "components";
import { TabNav } from "navigation/TabNav";
import { RealmProvider } from "utils/db";
import { ShareConsumer } from "utils/share";
import { Language } from "utils/contexts";

Realm.flags.THROW_ON_GLOBAL_REALM = true;

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <RealmProvider>
        <Language.Provider>
          <ShareConsumer />
          <Screen>
            <TabNav />
          </Screen>
        </Language.Provider>
      </RealmProvider>
    </ErrorBoundary>
  );
};

export { App };

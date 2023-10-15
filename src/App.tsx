import "react-native-get-random-values";

import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import Realm from "realm";

import { Screen } from "components";
import { TabNav } from "navigation/TabNav";
import { Language } from "utils/contexts";
import { RealmProvider } from "utils/db";
import { ShareConsumer } from "utils/share";

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

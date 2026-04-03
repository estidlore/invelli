import "react-native-get-random-values";

import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import Realm from "realm";

import { Screen } from "components";
import { Language, RealmProvider, ShareConsumer } from "utils";
import { LoadScreen } from "views/Load";

Realm.flags.THROW_ON_GLOBAL_REALM = true;

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <RealmProvider>
        <Language.Provider>
          <ShareConsumer />
          <Screen>
            <LoadScreen />
          </Screen>
        </Language.Provider>
      </RealmProvider>
    </ErrorBoundary>
  );
};

export { App };

import "react-native-get-random-values";

import ErrorBoundary from "react-native-error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Realm from "realm";

import { Screen } from "components";
import { Language, RealmProvider, ShareConsumer } from "utils";
import { LoadScreen } from "views/Load";

Realm.flags.THROW_ON_GLOBAL_REALM = true;

const App = (): React.JSX.Element => {
  return (
    <ErrorBoundary>
      <RealmProvider>
        <Language.Provider>
          <ShareConsumer />
          <SafeAreaProvider>
            <Screen>
              <LoadScreen />
            </Screen>
          </SafeAreaProvider>
        </Language.Provider>
      </RealmProvider>
    </ErrorBoundary>
  );
};

export { App };

import React from "react";

import { Screen } from "components";
import { TabNav } from "navigation/TabNav";
import { RealmProvider } from "utils/db";

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

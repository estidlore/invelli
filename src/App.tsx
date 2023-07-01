import "react-native-reanimated";

import React from "react";

import { Screen } from "components";
import { TabNav } from "navigation/TabNav";

const App = (): JSX.Element => {
  return (
    <Screen>
      <TabNav />
    </Screen>
  );
};

export { App };

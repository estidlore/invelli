import { render, screen } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Text } from "components";

import { Screen } from ".";

describe("Screen", () => {
  it("Render content", () => {
    expect.assertions(1);
    render(
      <Screen>
        <Text>{"Inventory"}</Text>
      </Screen>,
      { wrapper: SafeAreaProvider },
    );

    const text = screen.queryByText("Inventory");
    expect(text).toBeOnTheScreen();
  });
});

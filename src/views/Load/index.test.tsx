import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";

import { Language } from "utils";

import { LoadScreen } from ".";

describe("LoadScreen", () => {
  it("render content", async () => {
    expect.assertions(1);
    render(
      <NavigationContainer>
        <LoadScreen />
      </NavigationContainer>,
      { wrapper: Language.Provider },
    );
    expect(screen.queryByText("Invelli")).toBeOnTheScreen();
    await waitForElementToBeRemoved(() => screen.queryByText("Invelli"));
  });
});

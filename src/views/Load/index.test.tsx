import { NavigationContainer } from "@react-navigation/native";
import { render, screen } from "@testing-library/react-native";

import { Language } from "utils";

import { LoadScreen } from ".";

describe("LoadScreen", () => {
  it("render content", () => {
    expect.assertions(1);
    render(
      <NavigationContainer>
        <LoadScreen />
      </NavigationContainer>,
      { wrapper: Language.Provider },
    );
    expect(screen.queryByText("Invelli")).toBeOnTheScreen();
  });
});

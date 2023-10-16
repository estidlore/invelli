import { render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { LoadScreen } from ".";

describe("LoadScreen", () => {
  it("render content", () => {
    expect.assertions(1);
    render(
      <Language.Provider>
        <LoadScreen />
      </Language.Provider>,
    );
    expect(screen.queryByText("Invelli")).toBeOnTheScreen();
  });
});

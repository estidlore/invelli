import { render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { InventoryScreen } from ".";
import { entries } from "./language";

describe("InventoryScreen", () => {
  const { ENG } = entries;
  it("Render content", () => {
    expect.assertions(1);
    render(
      <Language.Provider>
        <InventoryScreen />
      </Language.Provider>,
    );

    expect(screen.queryByText(ENG.addItem)).toBeOnTheScreen();
  });
});

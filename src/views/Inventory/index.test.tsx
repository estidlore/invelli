import { render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { InventoryScreen } from ".";

describe("InventoryScreen", () => {
  it("Render content", () => {
    expect.assertions(1);
    render(
      <Language.Provider>
        <InventoryScreen />
      </Language.Provider>,
    );

    const text = screen.queryByText("Agregar artículo");
    expect(text).toBeOnTheScreen();
  });
});

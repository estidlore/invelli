import { render, screen } from "@testing-library/react-native";

import { InventoryScreen } from ".";

describe("InventoryScreen", () => {
  it("Render content", () => {
    expect.assertions(1);
    render(<InventoryScreen />);

    const text = screen.queryByText("Agregar artículo");
    expect(text).toBeOnTheScreen();
  });
});

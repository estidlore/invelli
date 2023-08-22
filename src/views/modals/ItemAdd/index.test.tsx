import { render, screen } from "@testing-library/react-native";

import { ItemAdd } from ".";

describe("modals/ItemAdd", () => {
  it("Show content", () => {
    expect.assertions(9);
    render(<ItemAdd onClose={jest.fn()} visible />);
    expect(screen.queryByTestId("icon-qrcode")).toBeOnTheScreen();
    const placeholders = [
      "Código",
      "Marca",
      "Costo",
      "Nombre",
      "Precio",
      "Cantidad",
      "Unidad (g)"
    ];
    placeholders.forEach((el) => {
      expect(screen.queryByPlaceholderText(el)).toBeOnTheScreen();
    });
    expect(screen.queryByText("Guardar")).toBeOnTheScreen();
  });
});

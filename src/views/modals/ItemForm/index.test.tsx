import { fireEvent, render, screen } from "@testing-library/react-native";

import { ItemForm } from ".";

describe("modals/ItemForm", () => {
  const placeholders = [
    "Código",
    "Marca",
    "Costo",
    "Nombre",
    "Precio",
    "Cantidad",
    "Unidad (g)",
  ];
  it("Show content", () => {
    expect.assertions(9);
    render(<ItemForm visible />);
    expect(screen.queryByTestId("icon-qrcode")).toBeOnTheScreen();

    placeholders.forEach((el) => {
      expect(screen.queryByPlaceholderText(el)).toBeOnTheScreen();
    });
    expect(screen.queryByText("Guardar")).toBeOnTheScreen();
  });

  it("Save data", () => {
    expect.assertions(2);
    const onSave = jest.fn();
    render(<ItemForm onSave={onSave} visible />);

    const values = ["123", "Alpina", "100", "Milk", "110", "7", "900g"];
    placeholders.forEach((el, idx) => {
      const input = screen.getByPlaceholderText(el);
      fireEvent.changeText(input, values[idx]);
    });

    expect(onSave).not.toHaveBeenCalled();
    fireEvent.press(screen.getByText("Guardar"));
    expect(onSave).toHaveBeenCalled();
  });
});

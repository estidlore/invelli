import { fireEvent, render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { ItemDetails } from ".";
import { entries } from "./language";

describe("ItemDetails", () => {
  const { ENG } = entries;
  const item = {
    brand: "Alpina",
    code: "123",
    cost: 100,
    name: "Milk",
    price: 110,
    quantity: 7,
    unit: "900g",
  };

  it("render content", () => {
    expect.assertions(7);
    render(<ItemDetails item={item} visible />, { wrapper: Language.Provider });

    [
      ENG.brand,
      ENG.code,
      ENG.cost,
      ENG.edit,
      ENG.price,
      ENG.quantity,
      ENG.unit,
    ].forEach((text) => {
      expect(screen.queryByText(text)).toBeOnTheScreen();
    });
  });

  it("open edit form", () => {
    expect.assertions(2);
    render(<ItemDetails item={item} visible />, { wrapper: Language.Provider });

    expect(screen.queryByText("Edit item")).not.toBeOnTheScreen();
    fireEvent.press(screen.getByText(ENG.edit));
    expect(screen.queryByText("Edit item")).toBeOnTheScreen();
  });
});

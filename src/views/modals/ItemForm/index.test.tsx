import { fireEvent, render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { ItemForm } from ".";
import { entries } from "./language";

describe("modals/ItemForm", () => {
  const { ENG } = entries;
  const placeholders = [
    ENG.code,
    ENG.brand,
    ENG.cost,
    ENG.name,
    ENG.price,
    ENG.quantity,
    ENG.unit,
  ];
  it("Show content", () => {
    expect.assertions(9);
    render(
      <Language.Provider>
        <ItemForm visible />
      </Language.Provider>,
    );
    expect(screen.queryByTestId("icon-qrcode")).toBeOnTheScreen();

    placeholders.forEach((el) => {
      expect(screen.queryByPlaceholderText(el)).toBeOnTheScreen();
    });
    expect(screen.queryByText(ENG.save)).toBeOnTheScreen();
  });

  it("Save data", () => {
    expect.assertions(2);
    const onSave = jest.fn();
    render(
      <Language.Provider>
        <ItemForm onSave={onSave} visible />
      </Language.Provider>,
    );

    const values = ["123", "Alpina", "100", "Milk", "110", "7", "900g"];
    placeholders.forEach((el, idx) => {
      const input = screen.getByPlaceholderText(el);
      fireEvent.changeText(input, values[idx]);
    });

    expect(onSave).not.toHaveBeenCalled();
    fireEvent.press(screen.getByText(ENG.save));
    expect(onSave).toHaveBeenCalled();
  });
});

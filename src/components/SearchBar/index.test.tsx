import { fireEvent, render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { SearchBar } from ".";
import { entries } from "./language";

describe("SearchBar", () => {
  const items = [
    "12 Sal Refisal 500g",
    "23 Salsa Fruco 1000g",
    "34 Mayonesa Fruco 1000g",
  ];
  const getKeywords = (el: string): string[] => el.split(" ");
  const { ENG } = entries;

  it("Render content", () => {
    expect.assertions(1);
    const onSearch = jest.fn();
    render(
      <SearchBar getKeywords={getKeywords} items={items} onSearch={onSearch} />,
      { wrapper: Language.Provider },
    );

    const input = screen.queryByPlaceholderText(ENG.product);
    expect(input).toBeOnTheScreen();
  });

  it("Filter items", () => {
    expect.assertions(3);
    const onChange = jest.fn();
    render(
      <SearchBar getKeywords={getKeywords} items={items} onSearch={onChange} />,
      { wrapper: Language.Provider },
    );

    const input = screen.getByPlaceholderText(ENG.product);
    fireEvent.changeText(input, "Sal");
    expect(onChange).toHaveBeenCalledWith([items[0], items[1]], "Sal");
    fireEvent.press(screen.queryByTestId("icon-eraser"));
    expect(input.props.value).toBe("");
    expect(onChange).toHaveBeenLastCalledWith([], "");
  });
});

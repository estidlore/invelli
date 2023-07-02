import { fireEvent, render, screen } from "@testing-library/react-native";

import { SearchBar } from ".";

describe("SearchBar", () => {
  const items = [
    "12 Sal Refisal 500g",
    "23 Salsa Fruco 1000g",
    "34 Mayonesa Fruco 1000g"
  ];
  const getKeywords = (el: string): string[] => el.split(" ");

  it("Render content", () => {
    expect.assertions(1);
    const onChange = jest.fn();
    render(
      <SearchBar getKeywords={getKeywords} items={items} onChange={onChange} />
    );

    const input = screen.queryByPlaceholderText("Producto");
    expect(input).toBeOnTheScreen();
  });

  it("Filter items", () => {
    expect.assertions(3);
    const onChange = jest.fn();
    render(
      <SearchBar getKeywords={getKeywords} items={items} onChange={onChange} />
    );

    const input = screen.getByPlaceholderText("Producto");
    fireEvent.changeText(input, "Sal");
    expect(onChange).toHaveBeenCalledWith([items[0], items[1]]);
    fireEvent.press(screen.queryByTestId("icon-eraser"));
    expect(input.props.value).toBe("");
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});

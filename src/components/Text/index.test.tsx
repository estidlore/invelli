import { render, screen } from "@testing-library/react-native";

import { Text } from ".";

describe("Text", () => {
  it("Render content", () => {
    expect.assertions(1);
    render(<Text>{"Dummy"}</Text>);

    const text = screen.queryByText("Dummy");
    expect(text).toBeOnTheScreen();
  });
});

import { render, screen } from "@testing-library/react-native";

import { Button } from ".";

describe("Button", () => {
  it("Render", () => {
    expect.assertions(1);
    render(<Button>{"Press me"}</Button>);

    const text = screen.queryByText("Press me");
    expect(text).toBeOnTheScreen();
  });
});

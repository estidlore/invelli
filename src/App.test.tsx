import { render, screen } from "@testing-library/react-native";

import { App } from "./App";

describe("App", () => {
  it("Render dummy text", () => {
    expect.assertions(1);
    render(<App />);

    const text = screen.queryByText("Dummy Text");
    expect(text).toBeOnTheScreen();
  });
});

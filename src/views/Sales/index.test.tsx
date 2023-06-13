import { render, screen } from "@testing-library/react-native";

import { SalesScreen } from ".";

describe("SalesScreen", () => {
  it("Render content", () => {
    expect.assertions(1);
    render(<SalesScreen />);

    const text = screen.queryByText("Sales");
    expect(text).toBeOnTheScreen();
  });
});

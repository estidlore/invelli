import { render, screen } from "@testing-library/react-native";

import { Alert } from ".";

describe("Alert", () => {
  it("Render content", () => {
    expect.assertions(1);
    render(<Alert type={"error"}>{"user invalid"}</Alert>);

    expect(screen.queryByText("user invalid")).toBeOnTheScreen();
  });
});

import { fireEvent, render, screen } from "@testing-library/react-native";

import { Select } from ".";

describe("Select", () => {
  it("render options", () => {
    expect.assertions(4);
    render(<Select label={"gender"} options={["F", "M"]} value={"F"} />);

    expect(screen.queryByText("gender")).toBeOnTheScreen();
    expect(screen.queryByText("F")).toBeOnTheScreen();
    expect(screen.queryByText("M")).not.toBeOnTheScreen();
    fireEvent.press(screen.getByText("F"));
    expect(screen.queryByText("M")).toBeOnTheScreen();
  });
});

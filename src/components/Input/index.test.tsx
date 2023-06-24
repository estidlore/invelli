import { fireEvent, render, screen } from "@testing-library/react-native";
import { useState } from "react";

import { Input } from ".";

describe("Input", () => {
  it("Render Input", () => {
    expect.assertions(1);
    render(<Input placeholder={"Product"} />);

    const input = screen.queryByPlaceholderText("Product");
    expect(input).toBeOnTheScreen();
  });

  it("Call onChange", () => {
    expect.assertions(2);

    const ControlledInput = (): JSX.Element => {
      const [value, setValue] = useState("");

      return (
        <Input onChange={setValue} placeholder={"Product"} value={value} />
      );
    };

    render(<ControlledInput />);

    const input = screen.getByPlaceholderText("Product");
    expect(input.props.value).toBe("");
    fireEvent.changeText(input, "Cheese");
    expect(input.props.value).toBe("Cheese");
  });
});

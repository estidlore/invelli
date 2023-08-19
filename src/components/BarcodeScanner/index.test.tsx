import { render, screen } from "@testing-library/react-native";

import { BarcodeScanner } from ".";

describe("BarcodeScanner", () => {
  it("Show content", () => {
    expect.assertions(1);
    render(<BarcodeScanner onScan={jest.fn()} visible />);

    expect(screen.queryByTestId("icon-times")).toBeOnTheScreen();
  });
});

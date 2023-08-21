import { fireEvent, render, screen } from "@testing-library/react-native";

import { BarcodeScanner } from ".";

describe("BarcodeScanner", () => {
  const iconOpen = "icon-qrcode";
  const iconClose = "icon-times";
  beforeEach(() => {
    render(<BarcodeScanner onScan={jest.fn()} />);
  });

  it("Show content", () => {
    expect.assertions(2);
    expect(screen.queryByTestId(iconOpen)).toBeOnTheScreen();
    expect(screen.queryByTestId(iconClose)).not.toBeOnTheScreen();
  });

  it("Open scanner", () => {
    expect.assertions(2);
    fireEvent.press(screen.getByTestId(iconOpen));
    expect(screen.queryByTestId(iconClose)).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId(iconClose));
    expect(screen.queryByTestId(iconClose)).not.toBeOnTheScreen();
  });
});

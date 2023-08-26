import { render, screen } from "@testing-library/react-native";

import { SettingsScreen } from ".";

describe("views/Settings", () => {
  it("Show content", () => {
    expect.assertions(1);
    render(<SettingsScreen />);

    expect(screen.queryByText("Compartir datos")).toBeOnTheScreen();
  });
});

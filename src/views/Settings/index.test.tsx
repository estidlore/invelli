import { render, screen } from "@testing-library/react-native";

import { Language } from "utils/contexts";

import { SettingsScreen } from ".";
import { entries } from "./language";

describe("views/Settings", () => {
  const { ENG } = entries;

  it("Show content", () => {
    expect.assertions(2);
    render(
      <Language.Provider>
        <SettingsScreen />
      </Language.Provider>,
    );

    expect(screen.queryByText(ENG.language)).toBeOnTheScreen();
    expect(screen.queryByText(ENG.shareData)).toBeOnTheScreen();
  });
});

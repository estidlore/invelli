import { render, screen } from "@testing-library/react-native";

import { Icon } from ".";

describe("Icon", () => {
  it("Render icon", () => {
    expect.assertions(1);
    render(<Icon name={"plus"} />);

    expect(screen.queryByTestId("icon-plus")).toBeOnTheScreen();
  });
});

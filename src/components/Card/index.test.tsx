import { render, screen } from "@testing-library/react-native";

import { Text } from "components/Text";

import { Card } from ".";

describe("Card", () => {
  it("Show content", () => {
    expect.assertions(2);
    render(
      <Card title={"My Item"}>
        <Text>{"Description"}</Text>
      </Card>,
    );
    expect(screen.queryByText("My Item")).toBeOnTheScreen();
    expect(screen.queryByText("Description")).toBeOnTheScreen();
  });
});

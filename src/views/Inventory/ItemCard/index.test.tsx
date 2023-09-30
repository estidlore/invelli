import { render, screen } from "@testing-library/react-native";
import Realm from "realm";

import { ItemCard } from ".";

describe("ItemCard", () => {
  const item = {
    code: "123",
    cost: 10,
    id: new Realm.BSON.UUID(),
    name: "Sausage",
    price: 11,
    quantity: 7,
    unit: "400g",
  };
  it("Show content", () => {
    expect.assertions(9);
    render(<ItemCard item={item} />);
    const icons = ["dollar-sign", "hashtag", "ruler", "key"];
    icons.forEach((icon) => {
      expect(screen.queryByTestId(`icon-${icon}`)).toBeOnTheScreen();
    });
    const texts = [
      item.name,
      item.price,
      item.quantity,
      item.unit,
      item.code,
    ].map((el) => el.toString());
    texts.forEach((text) => {
      expect(screen.queryByText(text)).toBeOnTheScreen();
    });
  });
});

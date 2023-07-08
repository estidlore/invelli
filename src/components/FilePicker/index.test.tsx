import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react-native";
import DocPicker from "react-native-document-picker";

import { FilePicker } from ".";

describe("FilePicker", () => {
  const text = "Pick file";

  it("Render content", () => {
    expect.assertions(1);
    render(<FilePicker>{text}</FilePicker>);

    expect(screen.queryByText(text)).toBeOnTheScreen();
  });

  it("Call onPick", async () => {
    expect.assertions(2);
    const onPick = jest.fn();
    render(<FilePicker onPick={onPick}>{text}</FilePicker>);

    fireEvent.press(screen.getByText(text));
    await waitFor(() => expect(DocPicker.pick).toHaveBeenCalled());
    expect(onPick).toHaveBeenCalledTimes(1);
  });
});

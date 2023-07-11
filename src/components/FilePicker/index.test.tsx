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
  let onPick: jest.Mock;

  beforeEach(() => {
    onPick = jest.fn();
    render(<FilePicker onPick={onPick}>{text}</FilePicker>);
  });

  it("Render content", () => {
    expect.assertions(1);

    expect(screen.queryByText(text)).toBeOnTheScreen();
  });

  it("Call onPick", async () => {
    expect.assertions(2);

    fireEvent.press(screen.getByText(text));
    await waitFor(() => {
      expect(DocPicker.pickSingle).toHaveBeenCalled();
    });
    expect(onPick).toHaveBeenCalledTimes(1);
  });
});

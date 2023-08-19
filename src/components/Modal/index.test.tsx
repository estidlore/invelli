import { fireEvent, render, screen } from "@testing-library/react-native";
import { useReducer } from "react";

import { Button } from "components/Button";
import { Text } from "components/Text";

import { Modal } from ".";

describe("Modal", () => {
  const t = {
    button: "Show modal",
    content: "Important message",
    title: "Important"
  };

  const ModalDemo = (): JSX.Element => {
    const [visible, toggleVisible] = useReducer((val) => !val, false);
    return (
      <>
        <Button onPress={toggleVisible}>{t.button}</Button>
        <Modal onClose={toggleVisible} title={t.title} visible={visible}>
          <Text>{t.content}</Text>
        </Modal>
      </>
    );
  };

  it("Render content", () => {
    expect.assertions(3);
    render(
      <Modal title={t.title} visible>
        <Text>{t.content}</Text>
      </Modal>
    );

    expect(screen.queryByText(t.title)).toBeOnTheScreen();
    expect(screen.getByTestId("icon-times")).toBeOnTheScreen();
    expect(screen.queryByText(t.content)).toBeOnTheScreen();
  });

  it("Toggle visibility", () => {
    expect.assertions(3);
    render(<ModalDemo />);

    expect(screen.queryByText(t.title)).not.toBeOnTheScreen();
    fireEvent.press(screen.getByText(t.button));
    expect(screen.queryByText(t.title)).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId("icon-times"));
    expect(screen.queryByText(t.title)).not.toBeOnTheScreen();
  });
});

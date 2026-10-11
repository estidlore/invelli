import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";

import { styles } from "./styles";

const FloatingButton = ({
  iconSize = 32,
  ...rest
}: Omit<ButtonProps, "color" | "style" | "variant">): React.JSX.Element => {
  return (
    <Button
      {...rest}
      color={"primary"}
      iconSize={iconSize}
      style={styles.floatingBtn}
      variant={"solid"}
    />
  );
};

export { FloatingButton };

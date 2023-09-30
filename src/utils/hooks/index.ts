import type { LayoutChangeEvent, LayoutRectangle } from "react-native";
import { useCallback, useState } from "react";

const useLayout = (): [LayoutRectangle, (ev: LayoutChangeEvent) => void] => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const handleLayout = useCallback((ev: LayoutChangeEvent): void => {
    setLayout(ev.nativeEvent.layout);
  }, []);

  return [layout, handleLayout];
};

export { useLayout };

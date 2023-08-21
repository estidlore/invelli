import { configure } from "@testing-library/react-native";

import "@testing-library/jest-native/extend-expect";

// Silence the warning: Animated: `useNativeDriver` is not supported because
// the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-camera-kit", () => ({
  Camera: jest.fn(),
  CameraType: {
    Back: "back",
    Front: "front"
  }
}));
jest.mock("react-native-fs", () => ({}));
jest.mock("react-native-document-picker", () => ({
  pick: jest.fn().mockResolvedValue([""]),
  pickSingle: jest.fn().mockResolvedValue("")
}));

jest.mock("utils/db", () => ({
  useCollection: jest.fn(() => []),
  useRealm: jest.fn(() => ({}))
}));

// Enable excluding hidden elements from the queries by default
configure({
  defaultIncludeHiddenElements: false
});

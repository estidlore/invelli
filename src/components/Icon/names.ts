/**
 * Add SF Symbols and Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const NAMES = {
  arrowDown: { android: "arrow-downward", ios: "arrow.down" },
  arrowDownRight: { android: "south-east", ios: "arrow.down.right" },
  arrowUp: { android: "arrow-upward", ios: "arrow.up" },
  arrowUpLeft: { android: "north-west", ios: "arrow.up.left" },
  back: { android: "arrow-back-ios-new", ios: "chevron.left" },
  bell: { android: "notifications", ios: "bell.fill" },
  cart: { android: "shopping-cart", ios: "cart.fill" },
  check: { android: "check", ios: "checkmark" },
  chevronDown: { android: "keyboard-arrow-down", ios: "chevron.down" },
  copy: { android: "content-copy", ios: "square.on.square" },
  dollar: { android: "attach-money", ios: "dollarsign" },
  error: { android: "error", ios: "exclamationmark.circle.fill" },
  flashOff: { android: "flash-off", ios: "bolt.slash.fill" },
  flashOn: { android: "flash-on", ios: "bolt.fill" },
  info: { android: "info", ios: "info.circle.fill" },
  inventory: { android: "inventory", ios: "archivebox.fill" },
  key: { android: "key", ios: "key.fill" },
  minus: { android: "remove", ios: "minus" },
  minusSquare: { android: "indeterminate-check-box", ios: "minus.square.fill" },
  number: { android: "numbers", ios: "number" },
  pencil: { android: "edit", ios: "pencil" },
  plus: { android: "add", ios: "plus" },
  plusSquare: { android: "add-box", ios: "plus.square.fill" },
  qrcode: { android: "qr-code", ios: "qrcode" },
  search: { android: "search", ios: "magnifyingglass" },
  settings: { android: "settings", ios: "gearshape.fill" },
  success: { android: "check", ios: "checkmark" },
  trash: { android: "delete", ios: "trash.fill" },
  void: { android: "block", ios: "nosign" },
  warning: { android: "warning", ios: "exclamationmark.triangle.fill" },
  xmark: { android: "clear", ios: "xmark" },
} as const;

type IconName = keyof typeof NAMES;

export type { IconName };
export { NAMES };

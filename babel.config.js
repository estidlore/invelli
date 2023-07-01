module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        root: ["src"]
      }
    ],
    [
      "react-native-reanimated/plugin",
      {
        globals: ["__decode", "__scanCodes"]
      }
    ]
  ]
};

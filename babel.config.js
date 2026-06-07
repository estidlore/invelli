module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Reads SQL contents directly into the bundle
      ["babel-plugin-inline-import", { extensions: [".sql"] }],
    ],
  };
};

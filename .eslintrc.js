module.exports = {
  env: {
    amd: true,
    node: true,
  },
  extends: ["estidlore/typescript", "estidlore/react", "estidlore/jest"],
  globals: {
    module: true,
    window: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  root: true,
  settings: {
    "import/ignore": ["react-native"],
  },
};

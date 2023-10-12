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
  rules: {
    "react/jsx-handler-names": "off",
  },
  settings: {
    "import/ignore": ["react-native"],
  },
};

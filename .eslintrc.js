module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb/base",
    "airbnb-typescript/base"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json"
  },
  rules: {
    quotes: ["error", "double"],
    curly: ["error", "all"],
    indent: "off",
    "no-console": ["error", { allow: ["info", "warn", "error"] }],
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "@typescript-eslint/quotes": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/indent": ["error", 2, {
      ignoredNodes: ["TSTypeParameterInstantiation"],
      SwitchCase: 1,
    }]
  },
  ignorePatterns: [".eslintrc.js"]
}
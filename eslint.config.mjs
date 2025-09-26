// eslint.config.mjs
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    ignores: ["**/*.test.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node }, // enables process, __dirname, etc.
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "error",
    },
  },
];

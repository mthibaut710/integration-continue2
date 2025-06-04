import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,jsx,mjs}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly"
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // Règles de base
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "comma-dangle": ["error", "never"],

      // Règles React
      "react/react-in-jsx-scope": "off", // Pas nécessaire avec React 17+
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  {
    files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly"
      }
    }
  }
];

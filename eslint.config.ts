import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/typescript";
import * as tsParser from "@typescript-eslint/parser";
import globals from "globals";
import compat from "eslint-plugin-compat";

export default [
  js.configs.recommended,
  compat.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
      globals: globals.browser,
    },
  },
];

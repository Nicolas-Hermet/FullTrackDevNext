import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

import pluginTs from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat({
  // This makes relative paths in legacy configs (like `eslint-config-airbnb`)
  // resolve correctly from the current file’s directory.
  baseDirectory: import.meta.url,
});

export default defineConfig([
  ...compat.extends(
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:@next/next/recommended"
  ),

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
      "react-hooks": pluginReactHooks,
      "@typescript-eslint": pluginTs,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
    },
    rules: {
      /* === Overrides ported from the old setup === */
      "no-debugger": "off",
      "no-alert": "off",
      "prefer-const": ["error", { destructuring: "all" }],
      "arrow-body-style": ["error", "as-needed"],
      "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
      "no-param-reassign": ["error", { props: false }],
      "no-console": "off",
      "import/prefer-default-export": "off",
      "func-names": "off",
      "comma-dangle": "off",
      "max-len": "off",
      "import/extensions": "off",
      "no-underscore-dangle": "off",
      "consistent-return": "off",
      "react/display-name": "warn",
      "react/no-array-index-key": "off",
      "react/prefer-stateless-function": "off",
      "react/forbid-prop-types": "off",
      "react/no-unescaped-entities": "off",
      "jsx-a11y/accessible-emoji": "off",
      "react/require-default-props": "off",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],
      radix: "off",
      quotes: [
        "error",
        "single",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          singleQuote: true,
          printWidth: 80,
          semi: true,
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      /* note: base rules disabled in favour of TS‑aware ones */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "res|next|Sequelize|^err|^_.*" },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
    },
  },

  eslintConfigPrettier,
]);

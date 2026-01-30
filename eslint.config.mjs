import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["adapter/**", "playground-1.mongodb.js"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
  "@typescript-eslint/no-unused-vars": [
    "error",
    { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
  ]
}

  },
  {
    ignores: ["adapter/**", "playground-1.mongodb.js"],
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
  },


  ...tseslint.configs.recommended.map(cfg => ({
    ignores: ["adapter/**", "playground-1.mongodb.js"],
    ...cfg
  })),
]);
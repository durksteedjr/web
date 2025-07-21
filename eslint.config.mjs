import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  {
    ignores: ["**/node_modules"],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
);

export default config;

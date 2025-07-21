/** @type {import("prettier").Config} */
const config = {
  overrides: [
    {
      files: "*.jsonc",
      options: {
        trailingComma: "none",
      },
    },
  ],
  plugins: ["prettier-plugin-packagejson"],
};

export default config;

/** @type {import("lint-staged").Config} */
const config = {
  "**/*.{js,jsx,ts,tsx}": "eslint --fix",
  "**/*": "prettier --write",
};

export default config;

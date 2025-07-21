import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const getRoot = () =>
  join(dirname(fileURLToPath(import.meta.url)), "../../../../");

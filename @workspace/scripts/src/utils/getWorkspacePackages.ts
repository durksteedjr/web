import { readdirSync } from "fs";
import { join, resolve } from "path";

import { getRoot } from "./getRoot";

interface GetWorkspacePackagesProps {
  workspace: string;
}

export const getWorkspacePackages = ({
  workspace,
}: GetWorkspacePackagesProps) =>
  readdirSync(resolve(join(getRoot(), `@${workspace}`)))
    .filter((directory) => !directory.startsWith("."))
    .map((app) => `@${workspace}/${app}`);

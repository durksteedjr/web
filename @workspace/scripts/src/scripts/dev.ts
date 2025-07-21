import { execSync } from "child_process";
import prompts from "prompts";

import { getRoot } from "../utils/getRoot";
import { getWorkspacePackages } from "../utils/getWorkspacePackages";

const dev = async () => {
  process.chdir(getRoot());

  const { value }: { value: boolean } = await prompts({
    initial: true,
    message: "Run dev for all workspace packages?",
    name: "value",
    type: "confirm",
  });

  console.log("");

  if (value)
    execSync("turbo dev --filter=!@workspace/scripts", { stdio: "inherit" });

  const { values }: { values: string[] } = await prompts({
    choices: [
      ...getWorkspacePackages({ workspace: "services" }).map(
        (workspacePackage) => ({
          title: workspacePackage,
          value: workspacePackage,
        }),
      ),
      { title: "@tools/drizzle", value: "@tools/drizzle" },
    ],
    instructions: false,
    message: "Select workspace packages",
    min: 1,
    name: "values",
    type: "autocompleteMultiselect",
  });

  console.log("");

  if (values.length > 0)
    execSync(
      `turbo dev ${values.map((value) => `--filter=${value}`).join(" ")} --filter=!@workspace/scripts`,
      { stdio: "inherit" },
    );
};

dev();

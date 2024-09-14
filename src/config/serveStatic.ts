import { ServeStaticModuleOptions } from "@nestjs/serve-static";
import { join } from "path";

const clientDist = join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "apps",
  "client",
  "dist"
);

export const serveStaticConfig: ServeStaticModuleOptions = {
  rootPath: clientDist,
};

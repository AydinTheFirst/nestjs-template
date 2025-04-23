import { join } from "path";

import { ServeStaticModuleOptions } from "@nestjs/serve-static";

const clientDist = join(process.cwd(), "..", "client", "dist");

export const serveStaticConfig: ServeStaticModuleOptions = {
  rootPath: clientDist,
};
